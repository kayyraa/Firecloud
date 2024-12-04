import * as Api from "./api.js";

const UsernameInput = document.getElementById("UsernameInput");
const PasswordInput = document.getElementById("PasswordInput");
const SubmitButton = document.getElementById("SubmitButton");

const UserExists = localStorage.getItem("User");
if (!UserExists && document.title !== "Account") {
    location.href = "./account.html";

    console.log(Api.User.GetUserByField("username", "kayra"));
}