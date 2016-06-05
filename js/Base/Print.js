/* eslint no-console: ["error", { allow: ["warn", "error", "trace"] }] */

let __DEV__ = process.env.NODE_ENV !== 'production';

let Print = obj => {

    if (__DEV__) {
        console.log(obj)
    }
};

module.exports = {
    Print: Print
}