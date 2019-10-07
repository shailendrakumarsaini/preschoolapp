export class MyOption{
    id:number;
    text: string;
    options:any;
    constructor(title:string){
     this.options= {
      // Declare the use of the extension in the dom parameter
       dom: 'Bfrtip',
    //   scrollX:true,
      // Configure the buttons
       buttons: [
         {extend: 'colvis',className: 'btn btn-primary btn-xs',footer: true },
  
         {extend: 'copyHtml5',className: 'btn btn-primary btn-xs', footer: true ,
         exportOptions: {
                   columns: ":visible"
           }
         },
  
         {extend: 'excelHtml5',className: 'btn btn-primary btn-xs', footer: true ,
         exportOptions: {
                   columns: ":visible"
           }
         },
  
         {extend: 'csvHtml5',className: 'btn btn-primary btn-xs', footer: true ,
         exportOptions: {
                   columns: ":visible"
           }
         },
  
         {extend: 'pdfHtml5',className: 'btn btn-primary btn-xs', footer: true ,
         exportOptions: {
                   columns: ":visible"
           }
         },
  
         {extend: 'print',className: 'btn btn-primary btn-xs', footer: true ,title:"Print Smooth",
         exportOptions: {
                   columns: ":visible",
                   format: {
      header: function( data, column ) {
       return data;
      },
      footer: function( data, column ) {
       return data;
      },
      body: function( data, row, column, node ) {
      if(column===0){
      return data+(row+1);
      }
      return data;
      }
    }
  
         },
         customize: function (win) {
          $(win.document.body).find('h1').css('text-align','center');
          $(win.document.body).find('h1').css('font-size', '20px');
          $(win.document.body).find('h1').css('font-weight', 'bold');
          $(win.document.body).find('h1').text(title);
          // $(win.document.body).find('thead tr:last-child(even) td').css('hidden','true');
        }
  
      },
    ],
    "fnRowCallback" : function(nRow, aData, iDisplayIndex){
                  $("td:first", nRow).html(iDisplayIndex +1);
                 return nRow;
      }
     };
  }
  }
  