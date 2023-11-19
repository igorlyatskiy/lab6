const request = require('supertest');
const httpStatus = require('http-status');
const { express: server } = require("../helper");
const { getAllUsers, deleteUser, createUser } = require("../../src/services/users.service").instance();

const USERS_ROUTE = '/users'
const userFields = ['userId', 'nickname', 'email', 'phone', 'role']

const TEST_USER_WITHOUT_ID = {
    email: "test@gmail.com",
    nickname: "tester",
    phone: "1239812938",
    role: "teacher"
}
const TEST_USER = {
    ...TEST_USER_WITHOUT_ID,
    userId: "a2963eae-b451-4a00-9b3f-c5c873619083",
}

describe(`Users`, () => {
    beforeEach(async () => {
        const users = await getAllUsers();

        for (const user of users) {
            await deleteUser(user.userId);
        }
    })

    test('[GET] /', async () => {
        await createUser(TEST_USER_WITHOUT_ID);

        await request(server)
            .get(USERS_ROUTE)
            .expect(httpStatus.OK)
            .then(({ body }) => {
                if (body.length) {
                    expect(body[0]).toContainAllKeys(userFields);
                }
            });
    });

    test('[GET] /:id', async () => {
        const user = await createUser(TEST_USER_WITHOUT_ID);

        await request(server)
            .get(`${USERS_ROUTE}/${user.userId}`)
            .expect(httpStatus.OK)
            .then(({ body }) => {
                expect(body).toContainAllKeys(userFields);
            });
    });

    test('[POST]', async () => {
        await request(server)
            .post(USERS_ROUTE)
            .send(TEST_USER)
            .expect(httpStatus.OK)
            .then(({ body }) => {
                expect(body).toContainAllKeys(userFields);
            });
    });

    test('[PATCH]', async () => {
        const user = await createUser(TEST_USER_WITHOUT_ID);

        const newNickname = "newNickname"

        await request(server)
            .patch(`${USERS_ROUTE}/${user.userId}`)
            .send({ ...TEST_USER, nickname: newNickname })
            .expect(httpStatus.OK)
            .then(({ body }) => {
                expect(body).toContainAllKeys(userFields);
                expect(body.nickname).toEqual(newNickname);
            });
    });

    test('[DELETE]', async () => {
        const user = await createUser(TEST_USER_WITHOUT_ID);

        await request(server)
            .delete(`${USERS_ROUTE}/${user.userId}`)
            .expect(httpStatus.OK)
            .then(({ body }) => {
                expect(body).toContainAllKeys(userFields);
            });
    });
});
