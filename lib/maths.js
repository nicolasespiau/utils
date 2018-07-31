'use strict';


module.exports = {
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  /**
   * Build and return all possible combinations using elements of the given array
   *
   * @param segments Array
   * @returns {*}
   */
  async getAllCombinations(segments) {
    if (segments.length === 1) {
      return segments;
    }

    let combinations = [];
    segments.forEach(async (segment, index) => {
      let elements = segments.filter((item, idx) => {
        return index !== idx;
      });
      let remainingCombinations = await this.getAllCombinations(elements);
      remainingCombinations.forEach((combination) => {
        combinations.push([segment].concat(combination));
      });
    });

    return combinations;
  },
  /**
   * Get all distributions of segments in `nDimensions`
   * @param segments
   * @param nDimensions
   * @returns {Array}
   */
  async getAllDistributions(segments, nDimensions) {
    let distributions = [];

    //stopping condition: if there only 1 segment we now how to build all possible combinations -> 1 line per dimension, segment populate the diagonal
    if (segments.length === 1) {
      for (let i = 0; i < nDimensions; i++) {
        //create a new line per dimension
        let line = [];
        for (let j = 0; j < nDimensions; j++) {
          //cell will be empty if not on diagonal, filled with the segment if on diagonal
          line[j] = (i === j ? [segments[0]] : []);
        }
        //add line to result array
        distributions.push(line);
      }

      //return distributions array
      return distributions;
    }

    /* if more than 1 segment then we build all combinations with first segment and we make a cartesian product with all
    distribution possible with the rest of segments */

    //clone array
    let copy = segments.slice(0);
    //remove first element from segments and store it to a local var
    let firstElement = copy.splice(0, 1);

    //do the cartesian_product
    distributions = this.cartesianProductArray(await this.getAllDistributions(firstElement, nDimensions), await this.getAllDistributions(copy, nDimensions));

    return distributions;
  },
  /**
   * Returns the cartesian product between array1 and array2
   *
   * @param array1
   * @param array2
   * @returns {Promise<Array>}
   */
  async cartesianProductArray(array1, array2) {
    let result = [];
    array1.forEach(async (lineA) => {
      array2.forEach(async (lineB) => {
        result.push(this.cartesianProductLine(lineA, lineB));
      });
    });

    return result;
  },
  /**
   * Returns the cartesian product between two arrays of values having the same length
   * @param line1
   * @param line2
   * @returns {Array}
   */
  cartesianProductLine(line1, line2) {
    let returnLine = [];
    line1.forEach((item, index) => {
      returnLine.push(item.concat(line2[index]));
    });
    return returnLine;
  },
  /**
   * Return the result of n!
   * @param n
   * @returns {number}
   */
  factorial(n) {
    if (n === 1 || n === 0) return 1;
    return n * this.factorial(Math.abs(n) - 1);
  }
};