import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { TreeViewComponent, NodeKeyPressEventArgs, NodeClickEventArgs, NodeSelectEventArgs } from '@syncfusion/ej2-angular-navigations';
import { HttpClientModule,HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  data
  constructor( private http: HttpClient){}
   //Data source for TreeView component
   public countries: Object[] = [
        { id: 1, name: 'Australia', hasChild: true, expanded: true },
        { id: 2, pid: 1, name: 'New South Wales' },
        { id: 3, pid: 1, name: 'Victoria' },
        { id: 4, pid: 1, name: 'South Australia' },
        { id: 6, pid: 1, name: 'Western Australia' },
        { id: 7, name: 'Brazil', hasChild: true },
        { id: 8, pid: 7, name: 'Paraná' },
        { id: 9, pid: 7, name: 'Ceará' },
        { id: 10, pid: 7, name: 'Acre' }, 
        { id: 11, name: 'China', hasChild: true },
        { id: 12, pid: 11, name: 'Guangzhou' },
        { id: 13, pid: 11, name: 'Shanghai' },
        { id: 14, pid: 11, name: 'Beijing' },
        { id: 15, pid: 11, name: 'Shantou' },
        { id: 16, name: 'France', hasChild: true },
        { id: 17, pid: 16, name: 'Pays de la Loire' },
        { id: 18, pid: 16, name: 'Aquitaine' },
        { id: 19, pid: 16, name: 'Brittany' },
        { id: 20, pid: 16, name: 'Lorraine' },
        { id: 21, name: 'India', hasChild: true },
        { id: 22, pid: 21, name: 'Assam' },
        { id: 23, pid: 21, name: 'Bihar' },
        { id: 24, pid: 21, name: 'Tamil Nadu' },
        { id: 25, pid: 21, name: 'Punjab' }
    ];

 public countriesss =[
    {
      "name": "Front End",
      "color": "#4db323",
      "default": true,
       expanded: true,
       hasChild: true,
      "courses": [
        {
          "name": "HTML",
          "default": true,
          "duration": "30",
          "_id": "5d389f35c96e7d26cc706bd7",
          "category": "5d389f25c96e7d26cc706bd6",
          "created_at": "2019-07-24T18:11:01.388Z",
          "updated_at": "2019-07-24T18:11:01.388Z"
        },
        {
          "name": "CSS",
          "default": true,
          "duration": "60",
          "_id": "5d38a116c96e7d26cc706bda",
          "category": "5d389f25c96e7d26cc706bd6",
          "created_at": "2019-07-24T18:19:02.026Z",
          "updated_at": "2019-07-24T18:19:02.026Z"
        }
      ],
      "_id": "5d389f25c96e7d26cc706bd6",
      "created_at": "2019-07-24T18:10:45.889Z",
      "updated_at": "2019-07-24T18:10:45.889Z"
    },
    {
      "name": "Back End",
      "color": "#520946",
      "default": true,
       expanded: true,
       hasChild: true,
      "courses": [
        {
          "name": "C#",
          "default": true,
          "duration": "40",
          "_id": "5d38a0e9c96e7d26cc706bd9",
          "category": "5d38a0dbc96e7d26cc706bd8",
          "created_at": "2019-07-24T18:18:17.602Z",
          "updated_at": "2019-07-24T18:18:17.602Z"
        }
      ],
      "_id": "5d38a0dbc96e7d26cc706bd8",
      "created_at": "2019-07-24T18:18:03.030Z",
      "updated_at": "2019-07-24T18:18:03.030Z"
    }
  ];
    // public field:Object ={ dataSource: this.countries, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
    // public field:Object ={ dataSource: this.countries, id: '_id', parentID: '_id', text: 'name', hasChildren: 'courses' };
    // public field:Object ={ dataSource: this.data, id: '_id',text: 'name', child: 'courses' };
    public field:Object ={};
    // Enable the checkbox for TreeView
    public showCheckBox:boolean = true;

    @ViewChild ('treevalidate',{static:true}) treevalidate;

    public nodeCheck(args: NodeKeyPressEventArgs | NodeClickEventArgs): void {
      let checkedNode: any = [args.node];
      if (args.event.target['classList'].contains('e-fullrow') || args.event['key'] == "Enter") {
        let getNodeDetails: any = this.treevalidate.getNodeData(args.node);
        if (getNodeDetails.isChecked == 'true') {
          this.treevalidate.uncheckAll(checkedNode);
        } else {
          this.treevalidate.checkAll(checkedNode);
        }
      }
    }

    @ViewChild('treevalidate',{static:true})
    public tree: TreeViewComponent;
    public allowMultiSelection: boolean = true;
    //set the Selected nodes to the TreeView
    public selectedNodes: string[] = [];
    //Bind the nodeSelected event
    public nodeSelected(e: NodeSelectEventArgs) {
      // console.log(e)
      // alert("The selected node's id: " + this.tree.selectedNodes); // To alert the selected node's id.
      // console.log("The selected node's id: " + this.tree.selectedNodes); // To alert the selected node's id.
      // console.log(this.tree.checkedNodes);
      // console.log(this.tree.);
    };


    nodeChecking(e){
      console.log(e)
    }

    selectedCources = [];
    nodeChecked(e){
      // console.log(e.data)
      if(e.action == 'check'){
        if(e.data[0].parentID == undefined || e.data[0].parentID == null){
          this.onCreate(e.data);
        }else{
          this.selectedCources.push(e.data[0]['id']);
        }
      }
      if(e.action == 'uncheck'){
        console.log(e.data)
        debugger
        if(e.data[0].parentID == undefined || e.data[0].parentID == null){
          for(let i=0;i<this.selectedCources.length;i++){
            for(let j=0; i<e.data.length; j++){
              if(this.selectedCources[i] == e.data[j]['id']){                
                // debugger
                this.selectedCources.splice(i,1);
              }
            }
          }
        }else{
          for(let i=0;i<this.selectedCources.length;i++){
            if(this.selectedCources[i] == e.data[0]['id']){
              this.selectedCources.splice(i,1);
            }
          }
        }
        // for(let i=0;i<this.selectedCources.length;i++){
        //   if(this.selectedCources[i] == e.data[0]['id']){
        //     this.selectedCources.splice(i,1);
        //   }
        // }
      }

      console.log('selectedCources ==> ',this.selectedCources);
    }
    
    ngOnInit(){
      this.data = [
        {
          "name": "Front End",
          "color": "#4db323",
          "default": true,
          "courses": [
            {
              "name": "HTML",
              "default": true,
              "duration": "30",
              "_id": "5d389f35c96e7d26cc706bd7",
              "category": "5d389f25c96e7d26cc706bd6",
              "created_at": "2019-07-24T18:11:01.388Z",
              "updated_at": "2019-07-24T18:11:01.388Z"
            },
            {
              "name": "CSS",
              "default": true,
              "duration": "60",
              "_id": "5d38a116c96e7d26cc706bda",
              "category": "5d389f25c96e7d26cc706bd6",
              "created_at": "2019-07-24T18:19:02.026Z",
              "updated_at": "2019-07-24T18:19:02.026Z"
            },
            {
              "name": "Java Script",
              "default": true,
              "duration": "160",
              "_id": "5d68b5debe652d4a04fe83e1",
              "category": "5d389f25c96e7d26cc706bd6",
              "created_at": "2019-08-30T05:36:30.250Z",
              "updated_at": "2019-08-30T05:36:30.250Z"
            }
          ],
          "_id": "5d389f25c96e7d26cc706bd6",
          "created_at": "2019-07-24T18:10:45.889Z",
          "updated_at": "2019-07-24T18:10:45.889Z"
        },
        {
          "name": "Back End",
          "color": "#520946",
          "default": true,
          "courses": [
            {
              "name": "C#",
              "default": true,
              "duration": "40",
              "_id": "5d38a0e9c96e7d26cc706bd9",
              "category": "5d38a0dbc96e7d26cc706bd8",
              "created_at": "2019-07-24T18:18:17.602Z",
              "updated_at": "2019-07-24T18:18:17.602Z"
            },
            {
              "name": "Python",
              "default": true,
              "duration": "180",
              "_id": "5d68b684be652d4a04fe83e2",
              "category": "5d38a0dbc96e7d26cc706bd8",
              "created_at": "2019-08-30T05:39:16.581Z",
              "updated_at": "2019-08-30T05:39:16.581Z"
            }
          ],
          "_id": "5d38a0dbc96e7d26cc706bd8",
          "created_at": "2019-07-24T18:18:03.030Z",
          "updated_at": "2019-07-24T18:18:03.030Z"
        },
        {
          "name": "Language",
          "color": "#5e5c1d",
          "default": true,
          "courses": [
            {
              "name": "Hindi",
              "default": true,
              "duration": "40",
              "_id": "5d38a252c96e7d26cc706bdc",
              "category": "5d38a245c96e7d26cc706bdb",
              "created_at": "2019-07-24T18:24:18.574Z",
              "updated_at": "2019-07-24T18:24:18.574Z"
            }
          ],
          "_id": "5d38a245c96e7d26cc706bdb",
          "created_at": "2019-07-24T18:24:05.541Z",
          "updated_at": "2019-07-24T18:24:05.541Z"
        },
        {
          "name": "Android",
          "color": "#c41515",
          "default": true,
          "courses": [
            {
              "name": "cortlin",
              "default": true,
              "duration": "50",
              "_id": "5d38a2a3c96e7d26cc706bde",
              "category": "5d38a28dc96e7d26cc706bdd",
              "created_at": "2019-07-24T18:25:39.498Z",
              "updated_at": "2019-07-24T18:25:39.498Z"
            }
          ],
          "_id": "5d38a28dc96e7d26cc706bdd",
          "created_at": "2019-07-24T18:25:17.556Z",
          "updated_at": "2019-07-24T18:25:17.556Z"
        },
        {
          "name": "Firebase",
          "color": "#15c4b5",
          "default": true,
          "courses": [
            {
              "name": "database",
              "default": true,
              "duration": "70",
              "_id": "5d38a2c8c96e7d26cc706be0",
              "category": "5d38a2b5c96e7d26cc706bdf",
              "created_at": "2019-07-24T18:26:16.438Z",
              "updated_at": "2019-07-24T18:26:16.438Z"
            }
          ],
          "_id": "5d38a2b5c96e7d26cc706bdf",
          "created_at": "2019-07-24T18:25:57.173Z",
          "updated_at": "2019-07-24T18:25:57.173Z"
        },
        {
          "name": "Ashish",
          "color": "#c05252",
          "default": true,
          "courses": [
            {
              "name": "Hindi",
              "default": true,
              "duration": "30",
              "_id": "5d4d884fcc3f6b8bf4dd44ab",
              "category": "5d4d8834cc3f6b8bf4dd44aa",
              "created_at": "2019-08-09T14:50:55.514Z",
              "updated_at": "2019-08-09T14:50:55.514Z"
            }
          ],
          "_id": "5d4d8834cc3f6b8bf4dd44aa",
          "created_at": "2019-08-09T14:50:28.221Z",
          "updated_at": "2019-08-09T14:50:28.221Z"
        },
        {
          "name": "osteen category",
          "color": "#81105d",
          "default": true,
          "courses": [
            {
              "name": "osteen cource",
              "default": true,
              "duration": "120",
              "_id": "5d50ef01f5c08c729c0d2993",
              "category": "5d50eee8f5c08c729c0d2992",
              "created_at": "2019-08-12T04:45:53.015Z",
              "updated_at": "2019-08-12T04:45:53.015Z"
            }
          ],
          "_id": "5d50eee8f5c08c729c0d2992",
          "created_at": "2019-08-12T04:45:28.849Z",
          "updated_at": "2019-08-12T04:45:28.849Z"
        }
      ];
      this.field = { dataSource: this.data, id: '_id',text: 'name', child: 'courses' }
    }

    public onCreate(data): void {
        for(let i=1; i<data.length; i++){
          this.selectedCources.push(data[i].id)
        }
        // let proxy = this.tree;
        // let element= proxy.element.querySelector('[data-uid="' + id + '"]');
        //     // Gets the child Element
        //     let liElements = element.querySelectorAll('ul li');
        //     let arr= [];
        //     for (let i = 0; i < liElements.length; i++) {
        //         let nodeData= proxy.getNode(liElements[i]);
        //         arr.push(nodeData);
        //     }
        // alert(JSON.stringify(arr));
    }
}