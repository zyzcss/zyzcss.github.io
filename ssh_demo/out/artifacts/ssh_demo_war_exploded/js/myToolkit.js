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
        while (cur != big) {
            if (list[cur] < pivotValue) {
                swap(list, ++small, cur++);
            } else if (list[cur] > pivotValue) {
                swap(list, cur, --big);
            } else {
                cur++;
            }
        }
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