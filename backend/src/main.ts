import User from "./itemClass.ts";

let user = new User({ email: "keerthi512@gmail.com" });

// await user.createUser({ name: "Keerthi" });

await user.addItem({
    name: "Test4",
    age: 22,
    price: 2999,
});
// await user.addItemMany(10);
