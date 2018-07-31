const should = require('should');
const MyLib = require('../lib/objects');

describe('Convert Object from Schema', () => {

	describe('Simple Object', () => {

		const schema = {
			now: Date,
			isTrue: Boolean
		};

		it('should convert correctly', () => {

			const o = {
				now: new Date(),
				isTrue: true
			};

			const newO = MyLib.convertFromSchema(JSON.parse(JSON.stringify(o)), schema);

			newO.should.be.eql(o);

		});

	});

	describe('Nested Objects', () => {

		const o = {
			subO: {
				code: 'String'
			},
			point: {
				type: 'croix',
				value: 3
			}
		};

		const schema = {
			subO: {
				code: String,
			},
			point: {
				type: String,
				value: Number
			}
		};

		it('should convert correctly', function () {

			const newO = MyLib.convertFromSchema(JSON.parse(JSON.stringify(o)), schema);

			newO.should.be.eql(o);
		});
	});

	describe('Iterable Object', () => {

		const o = {
			a: [{
				code: 'hello',
				three: 3,
				isTrue: true
			}],
			obj: {
				code: 'hello',
				now: new Date
			}
		};

		const schema = {
			a: [{
				code: String,
				three: Number,
				isTrue: Boolean
			}],
			obj: {
				code: String,
				now: Date
			}
		};

		it('should convert correctly', function () {
			const newO = MyLib.convertFromSchema(JSON.parse(JSON.stringify(o)), schema);

			newO.should.be.eql(o);
		});
	});
});
