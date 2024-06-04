var registerBtn = document.querySelector("#registerBtn");
var loginBtn = document.querySelector("#loginBtn");
var userName = document.querySelector("#userName")
var userEmail = document.querySelector("#userEmail")
var userPassword = document.querySelector("#userPassword")
var UserDataArr = JSON.parse(localStorage.getItem("userData")) ?? []
var WelcomeUserName = ""
var data = ""



console.log(UserDataArr)

function Register() {
    var crruentdataUser = getUserData()
    validAllData();
    if (isDataValidForm()) {
        data = getUserData()
        var listNames = SplitDataArrByName();
        var listEmails = SplitDataArrByEmail();

        if (listEmails != false) {
            /*  if (SplitDataArrByName().includes(crruentdataUser.userName)) {
                 // هنا رسالة عند تكرار اسم المستخدم
                 registerAlertErrorDisplay()
             } */
            if (SplitDataArrByEmail().includes(crruentdataUser.Email)) {
                // هنا رسالة عند تكرار ايميل المستخدم
                emailRegisterAlertErrorDisplay()
            }

            else {
                emailRegisterAlertSuccessDisplay()
                registerAlertSuccessDisplay()
                UserDataArr.push(data)
                addUser()
                clearForm()
                redirectToLogin()
            }

        }
        else {
            registerAlertSuccessDisplay()
            UserDataArr.push(data)
            addUser()
            clearForm()
            redirectToLogin()
        }
    }
}
function getUserData() {
    var userData = {
        userName: userName.value,
        Email: userEmail.value,
        Password: userPassword.value,
    }
    return userData;
}
function addUser() {
    localStorage.setItem("userData", JSON.stringify(UserDataArr))
}
function clearForm() {
    userName.value = "";
    userEmail.value = "";
    userPassword.value = "";
    userName.classList.remove("is-valid")
    userEmail.classList.remove("is-valid")
    userPassword.classList.remove("is-valid")

}
function isDataValidForm() {
    return /^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(userName.value) &&
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(userEmail.value) &&
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(userPassword.value);
}
function validAllData() {
    if (/^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(userName.value)) {
        userNameAlert.classList.add("d-none")
        userName.classList.add("is-valid")
        userName.classList.remove("is-invalid")


    }
    else {
        userNameAlert.classList.remove("d-none")
        userName.classList.remove("is-valid")
        userName.classList.add("is-invalid")

    }
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(userEmail.value)) {
        userEmailAlert.classList.add("d-none")
        userEmail.classList.add("is-valid")
        userEmail.classList.remove("is-invalid")
    }
    else {
        userEmailAlert.classList.remove("d-none")
        userEmail.classList.remove("is-valid")
        userEmail.classList.add("is-invalid")
    }
    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(userPassword.value)) {
        userPasswordAlert.classList.add("d-none")
        userPassword.classList.add("is-valid")
        userPassword.classList.remove("is-invalid")
    }
    else {
        userPasswordAlert.classList.remove("d-none")
        userPassword.classList.remove("is-valid")
        userPassword.classList.add("is-invalid")
    }
}
function validUserName() {



    if (/^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(userName.value)) {
        userNameAlert.classList.add("d-none")
        userName.classList.add("is-valid")
        userName.classList.remove("is-invalid")


    }
    else {
        userNameAlert.classList.remove("d-none")
        userName.classList.remove("is-valid")
        userName.classList.add("is-invalid")

    }

}
function validUserEmail() {

    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(userEmail.value)) {
        userEmailAlert.classList.add("d-none")
        userEmail.classList.add("is-valid")
        userEmail.classList.remove("is-invalid")
    }
    else {
        userEmailAlert.classList.remove("d-none")
        userEmail.classList.remove("is-valid")
        userEmail.classList.add("is-invalid")
    }
}
function validUserPassword() {

    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(userPassword.value)) {
        userPasswordAlert.classList.add("d-none")
        userPassword.classList.add("is-valid")
        userPassword.classList.remove("is-invalid")
    }
    else {
        userPasswordAlert.classList.remove("d-none")
        userPassword.classList.remove("is-valid")
        userPassword.classList.add("is-invalid")
    }
}
function SplitDataArrByName() {
    var userEmailArr = []
    var arr = JSON.parse(localStorage.getItem("userData"))
    if (arr != null) {

        for (var i = 0; i < arr.length; i++) {
            userEmailArr.push(arr[i].userName)
        }
        return userEmailArr;
    }
    else {

        return false
    }
}
function SplitDataArrByEmail() {
    var userEmailArr = []

    var arr = JSON.parse(localStorage.getItem("userData"))
    console.log(arr)
    if (arr != null) {

        for (var i = 0; i < arr.length; i++) {
            userEmailArr.push(arr[i].Email)
        }
        console.log("return Arr")

        return userEmailArr;
    }
    else {
        console.log("return bool Val")

        return false
    }


}
function login() {

    var emailsInLocalStorage = SplitDataArrByEmail()
    var crruentdataUser = getUserDataLogin()
    var currentIndex = ""

    if (emailsInLocalStorage == null || emailsInLocalStorage == "") {
        LoginAlertErrorDisplay()

    }
    else{
        currentIndex = SplitDataArrByEmail().indexOf(crruentdataUser.Email)
        if (emailsInLocalStorage.includes(crruentdataUser.Email)) {

            if (UserDataArr[currentIndex].Password == crruentdataUser.Password) {
                LoginAlertSuccessDisplay()
                // console.log(" Password is Valid")
                var UserName = UserDataArr[currentIndex].userName;
                WelcomeUserName = UserName;
                saveUserNameToLocal()
                redirectHome()
    
    
            }
            else {
                LoginAlertErrorDisplay()
                // console.log(" Password is not Valid")
            }
        }
        else {
            LoginAlertErrorDisplay()
            // console.log("Email is Not Valid")
        }
    }
}
function redirectHome() {
    setTimeout(() => {
        location.href = "Index.html";
    }, 1000);
}
function redirectToLogin() {
    setTimeout(() => {
        location.href = "Login.html";
    }, 2000);


}
function registerAlertErrorDisplay() {
    FailedRegisterAlert.classList.remove("d-none")
}
function registerAlertSuccessDisplay() {
    FailedRegisterAlert.classList.add("d-none")
}
function emailRegisterAlertErrorDisplay() {
    emailFailedRegisterAlert.classList.remove("d-none")
}
function emailRegisterAlertSuccessDisplay() {
    emailFailedRegisterAlert.classList.add("d-none")
}
function registerAlertSuccessDisplay() {
    successRegisterAlert.classList.remove("d-none")
    FailedRegisterAlert.classList.add("d-none")
}
function LoginAlertErrorDisplay() {
    FailedLoginAlert.classList.remove("d-none")
}
function LoginAlertSuccessDisplay() {
    successLoginAlert.classList.remove("d-none")
    FailedLoginAlert.classList.add("d-none")
}
function getUserDataLogin() {
    var userData = {
        Email: userEmail.value,
        Password: userPassword.value,
    }
    return userData;
}
function goToLoginPage() {
    location.href = "Login.html";
}
function saveUserNameToLocal() {
    localStorage.setItem("WelcomeUserName", JSON.stringify(WelcomeUserName))
}

/*  localStorage.clear()  
 */