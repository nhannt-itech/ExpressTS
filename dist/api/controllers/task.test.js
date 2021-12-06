"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../index");
describe("Test TaskController", () => {
    describe("Test Get API", () => {
        it("Request /task should return results is an Array", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(index_1.app).get("/admin/task").send();
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body.results)).toBe(true);
            expect(res.body.results.length <= 10).toBe(true);
        }));
        it("Request /task should return results is an Array have length < 8", () => __awaiter(void 0, void 0, void 0, function* () {
            const params = { pagesize: 8 };
            const res = yield (0, supertest_1.default)(index_1.app).get("/admin/task").query(params).send();
            expect(res.status).toBe(200);
            expect(res.body.results.length <= 8).toBe(true);
        }));
    });
    describe("Test Create API", () => {
        it("Request post /task should return 401 error code", () => __awaiter(void 0, void 0, void 0, function* () {
            const body = { title: "test", content: "test" };
            const res = yield (0, supertest_1.default)(index_1.app).post("/admin/task").send(body);
            expect(res.status).toBe(401);
        }));
        it("Request post /task should return results is an Array have length = 1", () => __awaiter(void 0, void 0, void 0, function* () {
            const body = { title: "test", content: "test" };
            const token = yield getToken("user", "user");
            const res = yield (0, supertest_1.default)(index_1.app)
                .post("/admin/task")
                .set("Authorization", "bearer " + token)
                .send(body);
            expect(res.status).toBe(200);
            expect(res.body.results.length === 1).toBe(true);
        }));
    });
});
function getToken(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = { username, password };
        const res = yield (0, supertest_1.default)(index_1.app).post("/admin/user/login").send(body);
        expect(res.status).toBe(200);
        return res.body.results;
    });
}
