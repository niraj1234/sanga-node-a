function delayFn(time){
    return new Promise((resolve) => setTimeout(resolve , time));
}

async function delayGreet(name){
    await delayFn(3000);
    console.log(name);
}

delayGreet('Niraj');
