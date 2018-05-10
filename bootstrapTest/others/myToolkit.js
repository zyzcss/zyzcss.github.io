function formToJson(form) {
    var formObject = {};
    var formArray =form.serializeArray();
    $.each(formArray,function(i,item){
        formObject[item.name] = item.value;
    });
    return formObject;
}
function myQuickSort(list){
	quickSort(list,0,list.length-1);
	function quickSort(list,start,end){
		let arr=[];
		while(start<end){
			arr=sort(list,start,end,getMid(list,start,end));
			quickSort(list,start,arr[0]-1);
			start=arr[1]+1;
		}
	}
	function getMid(list,start,end){
		let mid=start+Math.round((end-start)/2);
		if(list[mid]>list[end]){
			swap(list,mid,end);
		}
		if(list[start]>list[end]){
			swap(list,start,end);
		}
		if(list[mid]<list[start]){
			swap(list,mid,start);
		}
		return list[mid];
	}
	function sort(list,start,end,pivotValue){
		let small = start - 1;
        let cur = start;
        let big = end + 1;
        console.log(pivotValue);
        while (cur != big) {
            if (list[cur] < pivotValue) {
                swap(list, ++small, cur++);
            } else if (list[cur] > pivotValue) {
                swap(list, cur, --big);
            } else {
                cur++;
            }
        }
        console.log(list);
        let range = [];
        range[0] = small + 1;
        range[1] = big - 1;
        return range;
	}
	function swap(list,i,j){
		let temp=list[i];
		list[i]=list[j];
		list[j]=temp;
	}
	return list;
}
let l=[12,3,2,9,6,8,11,15,7];
console.log(l)
// console.log(myQuickSort(l));

function quick_sort(num,start,end){
    var i,last;
    if(start<end){
    	swap(num,start,Math.round((start+end)/2));
    	console.log(num[start]);
    	last=start;
    	for(i=start;i<=end;i++){
    		if(num[i]<num[start]){
    			if(i==last){
    				last++;
    			}else{
    				swap(num,++last,i);
    			}
    		}
    	}
    	swap(num,last,start);
    	console.log(num);
    	quick_sort(num,start,last-1);
    	quick_sort(num,last+1,end);
    }
    function swap(list,i,j){
		let temp=list[i];
		list[i]=list[j];
		list[j]=temp;
	}                                 //右边都是大于它的数
}
console.log(quick_sort(l,0,8),l);
