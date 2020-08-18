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
          for(var i =0; i<3; i++){
            if(i===2){
              j=0;
            } else {
              j=i+1;
            }

            let m = student[i] > student[j] ? student[i] : student[j];
            let n = student[i] < student[j] ? student[i] : student[j];

            if(!twoDepartments[[m + "//" + n]]){
              twoDepartments[[m + "//" + n]] = 1;
            }
            else {
              twoDepartments[[m + "//" + n]] += 1;
            }
          }

          m = student[0] > student[1] ? student[0] : student[1];
          let max = m > student[2] ? m : student[2];
          let middle = m < student[2] ? m : student[2];
          n = student[0] < student[1] ? student[0] : student[1];
          let min = n < student[2] ? n : student[2];

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
