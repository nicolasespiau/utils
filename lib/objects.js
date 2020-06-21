'use strict';


module.exports = {
	isEmpty(ele) {
		if (ele === null || ele === undefined) {
			return true;
		}

		if (!ele.constructor && (ele === {} || ele === '' || ele === [])) {
			return true;
		}

		const constructorName = ele.constructor.name;

		if (["String", "Array"].indexOf(constructorName) !== -1 && ele.length === 0) {
			return true;
		}
		if ((Array.isArray(ele) || typeof ele === 'string') && ele.length === 0) {
			return true;
		}

		if (Array.isArray(ele)) {
			let isEmpty = true;
			for (let i = 0; i < ele.length && isEmpty; i++) {
				isEmpty = this.isEmpty(ele[i]);
			}
			return isEmpty;
		}

		if (constructorName === 'Object') {
			if (Object.keys(ele).length === 0) {
				return true;
			}
			let isEmpty = true;
			for (let i = 0; i < Object.keys(ele).length && isEmpty; i++) {
				isEmpty = isEmpty && this.isEmpty(ele[Object.keys(ele)[i]]);
			}
			return isEmpty;
		}

		return false;
	},
	/**
	 * Return true if obj has the property propPath, false otherwise
	 * @param obj object
	 * @param propPath String
	 */
	hasProperty(obj, propPath) {
		const steps = propPath.split(".");
		let hasProp = true;

		let subObj = Object.assign({}, obj);
		for (let i = 0; i < steps.length && hasProp; i++) {
			hasProp = subObj.hasOwnProperty(steps[i]);
			subObj = subObj[steps[i]];
		}

		return hasProp;
	},
	/**
	 * Return true if obj has all properties in propPaths, false otherwise
	 * @param obj object
	 * @param propPaths Array
	 */
	hasProperties(obj, propPaths) {
		let hasProps = true;
		for (let i = 0; i < propPaths.length && hasProps; i++) {
			hasProps = this.hasProperty(obj, propPaths[i]);
		}
		return hasProps;
	},
	/**
	 * Return value of deep prop in obj
	 * @param obj object
	 * @param propPath string
	 * @returns {*}
	 */
	getValueAt(obj, propPath) {
		if (!this.hasProperty(obj, propPath)) {
			return null;
		}
		let copy = Object.assign({}, obj);
		const steps = propPath.split(".");
		steps.forEach((step) => {
			copy = copy[step];
		});

		return copy;
	},
	/**
	 * Set value at path in obj
	 * @param obj object
	 * @param value {*}
	 * @param path string
	 */
	setValueAt(obj, value, path) {
		const steps = path.split(".");
		while (steps.length > 1) {
			const step = steps.shift();
			if (!obj.hasOwnProperty(step)) {
				obj[step] = {}
			}
			obj = obj[step];
		}

		obj[steps.shift()] = value;
	},
	/**
	 * Remove all properties from inputObj except the ones given in toKeep
	 * @param inputObj object
	 * @param toKeep Array
	 * @param outputObj object
	 *
	 * @return object
	 */
	keepProperties(inputObj, toKeep, outputObj = {}) {
		if (!inputObj) {
			throw new Error("Cannot keep properties of undefined");
		}
		if (typeof inputObj !== "object") {
			throw new Error("Cannot keep properties of non object");
		}
		if (!Array.isArray(toKeep)) {
			throw new Error("Cannot read properties to keep");
		}

		toKeep.forEach((path) => {
			this.setValueAt(outputObj, this.getValueAt(inputObj, path), path);
		});
		return outputObj;
	},
	/**
	 * Remove empty props from given object
	 * @param obj
	 */
	removeEmptyProperties(obj) {
		if (typeof obj !== "object") {
			return;
		}
		for (const key of Object.keys(obj)) {
			if (this.isEmpty(obj[key])) {
				delete obj[key];
			} else {
				this.removeEmptyProperties(obj[key]);
			}
		}
	},
	/**
	 * Return true if the two objects are deeply equal, false otherwise
	 * 
	 * @param {Object} object1 
	 * @param {Object} object2 
	 * @return boolean
	 */
	deepEqual(object1, object2) {
		if (object1.constructor.name != object2.constructor.name) return false;

		if (object1.constructor.name !== "Object" && object1.constructor.name !== "Array") {
			return object1 === object2;
		}

		if (Object.keys(object1).length != Object.keys(object2).length) return false;

		for (const key of Object.keys(object1)) {
			if (!this.hasProperty(object2, key) || !this.deepEqual(object1[key], object2[key])) {
				return false;
			}
		}

		return true;
	},
	/**
	 * Build and return all possible combinations using elements of the given array
	 *
	 * @param segments Array
	 * @returns {*}
	 /**
	 * Return objects sorted by ids according to the order of the given ids
	 *
	 * @param objects Array objects to sort
	 * @param idFieldName String id field name in objects
	 * @param ids Array Ids ordered
	 */
	sortObjects(objects, idFieldName, ids) {
		let sortedObjects = [];
		let i = 0;
		//iterate through ids to order chapters according to the ids order
		ids.forEach((id) => {
			objects.forEach((object) => {
				if (object[idFieldName].toString() === id.toString()) {
					sortedObjects.push(object);
				}
			});
		});
		return sortedObjects;
	},

	matchFieldsAndTypes(object, schema, strict = false) {
		if (object.constructor.name !== "Object") {
			throw new Error("schema must be an object. " + object.constructor.name + " is not.");
		}
		//first inspect schema
		this.inspectSchema(schema);

		let missingKeys = [];
		let typeMismatches = [];
		let isValid = true;

		//for each entry in schema, check type
		for (const key of Object.keys(schema)) {
			//if object has no expected property, then consider object not valid if strict mode, do nothing otherwise
			if (!object.hasOwnProperty(key)) {
				if (strict) {
					isValid = false;
					missingKeys.push(key);
				}
				continue;
			}

			//if field is a sub schema, check it and continue
			if (schema[key].constructor.name === "Object") {
				try {
					isValid = this.matchFieldsAndTypes(object[key], schema[key], strict);
				} catch (e) {
					isValid = false;
					missingKeys.push(...(e.missingKeys.map((missingKey) => {
						return key + "." + missingKey;
					})));
					typeMismatches.push(...(e.typeMismatches.map((typeMismatche) => {
						return key + "." + typeMismatche;
					})));
				}
				continue;
			}

			//if field is an Array
			if (Array.isArray(schema[key])) {
				//if object does not contain an Array at the given path, consider it's not valid
				if (!Array.isArray(object[key])) {
					isValid = false;
					typeMismatches.push("Expected an array of " + schema[key][0].name + " at path " + key + " but got " + object[key].constructor.name + " instead.");
					//if object does actually contain Array, check if all items have the proper type
					continue;
				}

				//if an array of sub objects is expected, check them all
				if (schema[key][0].constructor.name === "Object") {
					for (const subObj of object[key]) {
						try {
							isValid = this.matchFieldsAndTypes(subObj, schema[key][0], strict);
						} catch (e) {
							isValid = false;
							missingKeys.push(...(e.missingKeys.map((missingKey) => {
								return key + "." + missingKey;
							})));
							typeMismatches.push(...(e.typeMismatches.map((typeMismatche) => {
								return key + "." + typeMismatche;
							})));
						}
					}
					continue;
				}

				//from here, an array of simple types is expected

				//remove item not having the expected type and count the resulting ones (having the expected type)
				const nbOfItemsHavingExpectedType = object[key].filter((item) => {
					return item.constructor.name === schema[key][0].name;
				}).length;

				//if count mismatch then some elements did not have the expected type
				if (nbOfItemsHavingExpectedType !== object[key].length) {
					isValid = false;
					typeMismatches.push("Expected array of " + schema[key][0].name + " at path " + key + ".");
				}
				continue;
			}

			//from here a simple type is expected
			//check if current field has the expected type
			if (object[key].constructor.name !== schema[key].name) {
				isValid = false;
				typeMismatches.push(schema[key].name + " expected, got " + object[key].constructor.name + " at path " + key);
			}
		}

		if (!isValid) {
			let message;
			if (missingKeys.length > 0) {
				message = "Missing keys: " + missingKeys.join(", ") + ".";
			}
			if (typeMismatches.length > 0) {
				message = "Types mismatches: " + typeMismatches.join(", ") + ".";
			}
			let mismatchError = new Error(message);
			mismatchError.missingKeys = missingKeys;
			mismatchError.typeMismatches = typeMismatches;
			throw mismatchError;
		}

		return isValid;
	},

	inspectSchema(schema) {
		//can inspect only JSON objects
		if (schema.constructor.name !== "Object") {
			throw new Error("schema must be an object. " + schema.constructor.name + " is not.");
		}

		//checks all fields
		for (const key of Object.keys(schema)) {
			//if field is a JSON inspect it as a schema
			if (schema[key].constructor.name === "Object") {
				this.inspectSchema(schema[key]);
			} else {
				//if field is an Array check if it has one element only and if it is a inspectable object or a type
				if (Array.isArray(schema[key])) {
					//trow error if it has no or more than 1 element
					if (schema[key].length !== 1) {
						throw new Error("schema can have arrays of one type only. " + schema[key].join(",") + " received.");
					}

					//it it's an inspectable object, inspect it, otherwise check if it's a correct type
					if (schema[key][0].constructor.name === "Object") {
						this.inspectSchema(schema[key][0]);
					} else {
						if (!this.isConstructor(schema[key][0])) {
							throw new Error(schema[key][0].toString() + " is not a type");
						}
					}
				} else {
					//if field is a simple field, check if it's a correct type
					if (!this.isConstructor(schema[key])) {
						throw new Error(schema[key].toString() + " is not a type");
					}
				}
			}
		}
	},

	buildSchema(schema) {
		//can inspect only JSON objects
		if (schema.constructor.name !== "Object") {
			throw new Error("schema must be an object. " + schema.constructor.name + " is not.");
		}

		//checks all fields
		for (const key of Object.keys(schema)) {
			//if field is a JSON build the sub schema
			if (schema[key].constructor.name === "Object") {
				schema[key] = this.buildSchema(schema[key]);
			} else {
				//if field is an Array check if it has one element only and if it is a inspectable object or a type
				if (Array.isArray(schema[key])) {
					//trow error if it has no or more than 1 element
					if (schema[key].length !== 1) {
						throw new Error("schema can have arrays of one type only. " + schema[key].join(",") + " received.");
					}

					//it it's an inspectable object, build it, otherwise check if it's a correct type
					if (schema[key][0].constructor.name === "Object") {
						schema[key][0] = this.buildSchema(schema[key][0]);
					} else {
						//if current item is already a constructor then do nothing
						if (this.isConstructor(schema[key][0])) continue;

						//if current item is not the name of a constructor it can't be considered as a type
						if (!global.hasOwnProperty(schema[key][0])) {
							throw new Error(schema[key][0].toString() + " is not a type");
						}

						schema[key][0] = global[schema[key][0]];
					}
				} else {
					//if current item is already a constructor then do nothing
					if (this.isConstructor(schema[key])) continue;

					//if field is a simple field, check if it's a correct type
					if (!global.hasOwnProperty(schema[key])) {
						throw new Error(schema[key].toString() + " is not a type");
					}

					schema[key] = global[schema[key]];
				}
			}
		}
		return schema;
	},

	isConstructor(f) {
		try {
			const obj = new f();
			return true;
		} catch (e) {
			return false
		}
	},

	convertFromSchema(o, schema) {
		//can inspect only JSON objects
		if (schema.constructor.name !== "Object") {
			throw new Error("schema must be an object. " + schema.constructor.name + " is not.");
		}

		const newO = {};

		for (const k in schema) {
			if (o.hasOwnProperty(k)) {

				if (Array.isArray(schema[k])) {
					if (Array.isArray(o[k])) {

						newO[k] = [];
						o[k].forEach((so, i) => {
							newO[k][i] = this.convertFromSchema(so, schema[k][0]);
						});
						continue;

					} else {
						throw new Error(`[${k}] is not an array`);
					}
				}

				if (schema[k].constructor.name === 'Object') {
					newO[k] = this.convertFromSchema(o[k], schema[k]);
					continue;
				}

				if (schema[k] === Date) {
					newO[k] = new Date(o[k]);
					continue;
				}

				if (!this.isConstructor(schema[k])) {
					throw new Error(`[key: ${k} ] ${schema[k]} is not a type`);
				}

				newO[k] = schema[k](o[k]);


			}

		}
		return newO;
	}
};
