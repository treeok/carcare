var urlArray = document.URL.split('/'),
    docName = urlArray[urlArray.length-1].split('.')[0];

    if(docName=='login'){
        //login.html
        require(['include/loginPage'], function (LoginPage) {

        });
    }else if(docName=='register'){
        require(['include/registerPage'], function (RegisterPage) {

        });
    }else if(docName=='forgetPsd'){
        require(['include/forgetPsdPage'], function (ForgetPsdPage) {

        });
    }






