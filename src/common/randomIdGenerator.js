const randomIdGenerator = str => (`${(Math.random()*1000)}str${Math.random()*1000}`).split("").reduce(function(acc, val) {
    acc=((acc<<5)-acc)+val.charCodeAt(0);
    return acc & acc;
});

export default randomIdGenerator;