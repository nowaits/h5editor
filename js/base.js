import {Print} from './Print'

function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}

module.exports = {
    Assert: assert,
    Print: Print
}