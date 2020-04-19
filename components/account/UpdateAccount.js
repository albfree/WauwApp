import { db } from "../population/config.js";

const changeAvatar = () => {};

export function updateName(id, name) {
  let userData = {
    name: name,
  };
  db.ref("wauwers").child(id).update(userData);
}

export function updateEmail(email) {
  let userData = {
    email: email,
  };
  db.ref("wauwers").child(userInfo.id).update(userData);
}

export function updateDescription(desc) {
  let userData = {
    description: desc,
  };
  db.ref("wauwers").child(userInfo.id).update(userData);
}
