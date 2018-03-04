const babel=require("babel-core");
const result=babel.transform("const a=5-2",{
	plugins:[
	require("../index")
	]
});
console.log(result.code);