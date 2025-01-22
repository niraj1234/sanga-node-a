function divideFn(num1,num2) {
    return new Promise((resolve,reject) => {
        if(num2 === 0){
            reject('Cant be divided by Zero');
        }else{
            resolve(num1 / num2);
        }
    })
}

divideFn(24 , 0).then((result) => { console.log(result , "Result done")})
.catch((error) => console.log(error , "Error "));

