/**
   本babel插件，旨在将位运算发扬光大，不过位运算会自动将数字转化为32位整数，因此世人弃之，不亦悲乎
**/
let babel=require('babel-core');
let types=require('babel-types');
const visitor={
	BinaryExpression(path){
		const node=path.node;
		let result;
		let calType;
		if(node.right.value==2 && node.operator=="/"){calType="division";}
		if(node.right.value==2 && node.operator=="*"){calType="multiply";}
		if(node.right.value==2 && node.operator=="%"){calType="mod";}
	    if(types.isNumericLiteral(node.left) && types.isNumericLiteral(node.right)&&node.operator=="+"){   	calType="add";}
		 if(types.isNumericLiteral(node.left) && types.isNumericLiteral(node.right)&&node.operator=="-"){   	calType="minus";}
		 
		switch(calType){
			case "division":
			  result=node.left.value>>1;
			  break;
			case "multiply":
			  result=node.left.value<<1;
			  break; 
			case "mod":
			  result=node.left.value&1;
			  break;	
            case "add":
              result=addNumber(node.left.value,node.right.value);
              break;
			case "minus":
			  result=minusNumber(node.left.value,node.right.value);
			  break;
			default:
		}
		if(result!==undefined){
			path.replaceWith(types.numericLiteral(result));
			 // let parentPath=path.parentPath;
			 // parentPath&&vistor.BinaryExpression.call(this,parentPath);
		}
		function addNumber(num1,num2){
			let sum;let carry;
			do{
			   sum=num1^num2;                //不带进位的求和
			   carry=(num1&num2)<<1;         //只求进位的数值
			   num1=sum;
			   num2=carry;
			}
			while(num2!=0);
			return num1;
		}
		function minusNumber(num1,num2){
			let temp=(~num2)+1;              //(~25)=-25-1
			let result=addNumber(num1,temp);
			return result;
		}
	}
}

module.exports=function(babel){
	return {
		visitor
	}
}




