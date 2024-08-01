"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokenUtils_1 = require("@/lib/tokenUtils");
// Replace "userId123" with an actual user ID if available
var token = (0, tokenUtils_1.generateToken)("userId123");
console.log("Generated Token:", token);
