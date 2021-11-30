import request from "supertest";
import { app } from "../../index";

describe("Test TaskController", () => {
	describe("Test Get API", () => {
		it("Request /task should return results is an Array", async () => {
			const res = await request(app).get("/admin/task").send();
			expect(res.status).toBe(200);
			expect(Array.isArray(res.body.results)).toBe(true);
			expect(res.body.results.length <= 10).toBe(true);
		});
		it("Request /task should return results is an Array have length < 8", async () => {
			const params = { pagesize: 8 };
			const res = await request(app).get("/admin/task").query(params).send();
			expect(res.status).toBe(200);
			expect(res.body.results.length <= 8).toBe(true);
		});
	});
	describe("Test Create API", () => {
		it("Request post /task should return 401 error code", async () => {
			const body = { title: "test", content: "test" };
			const res = await request(app).post("/admin/task").send(body);
			expect(res.status).toBe(401);
		});
		it("Request post /task should return results is an Array have length = 1", async () => {
			const body = { title: "test", content: "test" };
			const token = await getToken("user", "user");
			const res = await request(app)
				.post("/admin/task")
				.set("Authorization", "bearer " + token)
				.send(body);
			expect(res.status).toBe(200);
			expect(res.body.results.length === 1).toBe(true);
		});
	});
});

async function getToken(username: string, password: string) {
	const body = { username, password };
	const res = await request(app).post("/admin/user/login").send(body);
	expect(res.status).toBe(200);
	return res.body.results;
}
