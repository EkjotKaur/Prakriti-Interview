let selectedFile;

document.getElementById("my_file_input").addEventListener("change", (event) => {
  selectedFile = event.target.files[0];
});

document.getElementById("button").addEventListener("click", () => {
  document.getElementById("two").style.display = "block";
  document.getElementById("three").style.display = "block";
  if(selectedFile){
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      // console.log(event.target.result);
      let data = event.target.result;
      let workbook = XLSX.read(data, {type: "binary"});
      
      workbook.SheetNames.forEach(sheet => {
        let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {header : 1});
  
        var twoDepartments = {};
        var threeDepartments = {};

        rowObject.forEach(student => {
          if(student[0] === student[1] && student[2] === student[1]){
            if(!twoDepartments[[student[0] + "//" + student[0]]]){
              twoDepartments[[student[0] + "//" + student[0]]] = 1;
            }
            else {
              twoDepartments[[student[0] + "//" + student[0]]] += 1;
            }
          }
          else if(student[0] === student[1] || student[1] === student[2] || student[0]===student[2]){
            for(var i=0; i<3;i++){
              if(i===2){
                j=0;
                k=1;
              } else if(i===1) {
                j=i+1;
                k=0;
              } else {
                j=i+1;
                k=i+2;
              }
              if(student[i] === student[j]){
                let m = student[i] > student[k] ? student[i] : student[k];
                let n = student[i] < student[k] ? student[i] : student[k];
                console.log(m + " // " + n);

                if(!twoDepartments[[m + "//" + n]]){
                  twoDepartments[[m + "//" + n]] = 1;
                }
                else {
                  twoDepartments[[m + "//" + n]] += 1;
                }
                if(!twoDepartments[[student[i] + "//" + student[i]]]){
              twoDepartments[[student[i] + "//" + student[i]]] = 1;
                }
                else {
                  twoDepartments[[student[i] + "//" + student[i]]] += 1;
                }
              }
            }
          }
          else{

          
            for(var i =0; i<3; i++){
              
              if(i===2){
                j=0;
              } else {
                j=i+1;
              }

              let m = student[i] > student[j] ? student[i] : student[j];
              let n = student[i] < student[j] ? student[i] : student[j];
              console.log(m + " // " + n);

              if(!twoDepartments[[m + "//" + n]]){
                twoDepartments[[m + "//" + n]] = 1;
              }
              else {
                twoDepartments[[m + "//" + n]] += 1;
              }
            }
          }

          
          
          let arr = [student[0], student[1], student[2]];
          console.log(arr);
          arr.sort();
          console.log(arr);
          let min = arr[0];
          let middle = arr[1];
          let max = arr[2];

          if(!threeDepartments[[max + "//" + middle + "//" + min]]){
            threeDepartments[[max + "//" + middle + "//" + min]] = 1;
            
          }
          else {
            threeDepartments[[max + "//" + middle + "//" + min]] += 1;
          }

          
        });
        document.getElementById('two-departments').innerHTML = JSON.stringify(twoDepartments, null, 2);
        document.getElementById('three-departments').innerHTML = JSON.stringify(threeDepartments, null, 2);

        console.log(twoDepartments);
        console.log(threeDepartments);
      });
    }
  }
});
