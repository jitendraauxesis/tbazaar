import { Component, OnInit,OnChanges, ViewChild,ElementRef, Input } from '@angular/core';

import { AngularFireDatabase,AngularFireList,AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs';
import * as firebase from 'firebase/app';
import { SimpleChanges } from '@angular/core';

import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-pagetest',
  templateUrl: './pagetest.component.html',
  styleUrls: ['./pagetest.component.css'],
  providers:[SignupService]
})
export class PagetestComponent implements OnInit {

  user: Observable<firebase.User>;
  //items: AngularFireList<any[]>;
  msgVal: any = [];
  items2: Observable<any[]>;
  public errmsg:any = "";
  public sucmsg:any = "";

  defaultDatabase:any;

  itemsRef: AngularFireList<any>;
  itemsRef2: AngularFireList<any>;
  itemRef:  AngularFireObject<any>;

  items: Observable<any[]>; //  list of objects
  item:  Observable<any>|any="-none-";   //   single object
  private basePath = '/transaction_details';

  backdata:string;

  asyndata:any;

  initialCount:any = 0;
  progresstype:any="danger";
  progressvalue:number=0;
  progressshow:boolean = false;
  shown:number = 0;
  fbinterval:any;

  asyncpipe:Observable<any>|null = null;
  asyncpipe1:Observable<any>|null = null;

  constructor(
    public afAuth: AngularFireAuth, 
    public af: AngularFireDatabase,
    public element:ElementRef,
    public db: AngularFirestore,
    public signupprovider:SignupService,
    public localstore:LocalStorageService
  )  { 
    this.user = afAuth.authState;

    this.defaultDatabase = firebase.database();

    this.itemsRef2 = af.list('/transaction_details');
    this.itemsRef = af.list('/transaction_details');

    this.itemRef =  af.object('/transaction_details/-KyubmSRSrWVfxPjLS_j');

    let email = this.signupprovider.retrieveFromLocal("AUXUserEmail");
    let token = "tokenbazaar";
    console.log(email,token);

    // let sign = this.signup(email,token);
     let login = this.login(email,token);
    
    //this.items = af.list('/database/data/aadhar_no');
    //this.items2 = db.collection('user').valueChanges();
    //this.createItem("ABCD@2");
    //this.createItemtransaction_details();
    
    setTimeout(()=>{
      console.log("5s")
      //this.shown = true;
      setTimeout(()=>{
        console.log("5s")
        this.fbinterval = setInterval(()=>{
          console.log('interval started');
          this.items = this.gettransaction_details();
        },1000);
        //console.log(this.items)
      },5000);
    },5000)
    //this.items = this.gettransaction_details();
    
    
    
    //this.backdata = this.items[0].str;
    // let a = this.getItemList2();
    //console.log(this.inputConf+'2')
 
    // let news = af.object('transaction_details/confirmations').snapshotChanges();
    // this.backdata = news.toString();
    // console.log(news);
   //this.get2();
   // console.log(a)


   ///transaction details
   //this.t1();


  this.item = this.again();

  //  this.item = this.gettt();
    console.log(this.item);

   //this.gettransaction_details2();
  }

  tirg(){
    this.createItemtransaction_details();
    //this.items = this.gettransaction_details();
  }

  signup(email: string, password: string) {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

  login(email: string, password: string) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!',value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  ngOnInit() {
  }

  ///
  t1(){
    // let d = {
    //   'value':'adsf',
    //   'confirmations':0
    // }
    // this.itemsRef.push(d);
    let a = firebase.database().ref('/dummy_details').once('value').then((snapshot)=> {
      //var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      // ...
      console.log(snapshot.val(),snapshot,snapshot.val().confirmations);
      
      //this.item = 
    });
  }
  ///

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log(changes);
    let log: string[] = [];
    for(let p in changes){
      console.log(p,"change done")
      let changedProp = changes[p];
      let to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
       console.log(`Initial value of ${p} set to ${to}`);
      } else {
        let from = JSON.stringify(changedProp.previousValue);
        console.log(`${p} changed from ${from} to ${to}`);
      }
    }
  }

  //transaction_details
  createItemtransaction_details(): void {
    let d = {
      'email_id':'jitendra@auxesisgroup.com',
      'to_address':'abcd',
      'from_address':'mvesdfsdfsdggdfgfdgdfgxjj4oRqhM7G2dQmuTjBtz5EWBhMjwfL',
      'value':'value',
      'txid':'txid',
      'confirmations':0,
      'currency':'btc'
    }
    this.itemsRef.push(d);
  }
 
  again(){
    this.af.list('/transaction_details/-KyubmSRSrWVfxPjLS_j')
    .snapshotChanges()
    //Convert array into Observable and flatten it
    // .flatMap(list => list)
    // //Get only the first item in this list
    // .first()
    //Transform the value
    //.map((key) => ({key: "-KyubmSRSrWVfxPjLS_j"}))
    //Subscribe to the stream
    .subscribe(x => x.values);
  }
  gettt(){
    //-KyubmSRSrWVfxPjLS_j
   return this.af.object('email_id').snapshotChanges();
  //  .map(arr=>{
  //      Object.assign(
  //     arr.payload.val(), { $key: arr.key }) 
  //  });
  }
  gettransaction_details(){
    let useremail = this.signupprovider.retrieveFromLocal("AUXUserEmail");
    let ar = [];
    return this.itemsRef2.snapshotChanges().map(arr => {
      console.log(arr)
      if(arr.length>0){
        // if(this.fbinterval){
        //   clearInterval(this.fbinterval);
        //   console.log("interval stopped...")
        // }
        let key;let val;
        ar = [];
        arr.forEach(
          d=>{
            console.log(d.key,d.payload.val())
            let secretaddress = d.key;
            let to_address = "abcd";
            //if(secretaddress == to_address){
              if(this.fbinterval && d.payload.val().to_address == to_address){
                clearInterval(this.fbinterval);
                console.log("interval stopped...")
              }
              let email = d.payload.val().email_id;
              let currency = d.payload.val().currency;
              let check_address = d.payload.val().to_address;
              if(email == useremail && currency == 'btc' && to_address == check_address){
                key = d.key;
                val = d.payload.val();
                ar.push(d);
                this.initialCount = d.payload.val().confirmations;
                console.log(key,d.payload.val())
              }
            //}
          }
        )
        console.log(key,val,val.confirmations);
        if(this.initialCount == 0 || val.confirmations == 0){
          this.progresstype = "danger";
          this.progressvalue = 0;
          this.shown  = 1;
        }
        if(this.initialCount == 1 || val.confirmations == 1){
          this.progresstype = "warning";
          this.progressvalue = 50;
        }
        if(this.initialCount == 2 || val.confirmations == 2){
          this.progresstype = "info";
          this.progressvalue = 100;
        }
        if(val.confirmations == 3 || val.confirmations == 3){
          this.progresstype = "success";
          this.progressvalue = 150;
          setTimeout(()=>{
            this.progressshow = true;
            this.callToopen(val);
            this.shown  = 2;
          },1500);
          //confirmation toastr
        }
        return ar.map(snap => Object.assign(
          snap.payload.val(), { $key: snap.key }) 
        );
      }
    })
  }
  callToopen(val){
    console.log(val,"imcalled")
  }
  backup(){
      return this.itemsRef2.snapshotChanges().map(arr => {
        console.log(arr)
        arr.forEach(
          d=>{
            console.log(d.key,d.payload.val())
          }
        )
        return arr.map(snap => Object.assign(
          snap.payload.val(), { $key: snap.key }) 
        );
      })
  }
  gettransaction_details2(){
    this.itemsRef2.snapshotChanges().map( data =>{
      if (data) {
        console.log("Subscribe: ", data);
        data.map( test =>{
          console.log("Map: ", test.payload.val());
        });  		
      }
    })
    console.log("data","val")
  }
  get2(){
    this.itemsRef.snapshotChanges().map(arr => {
      arr.map(snap => {
        //this.backdata = snap.toString();
        console.log(snap);
      }
      )
    })
  }
  callItem(key){
    console.log(key)
  }
  changeMade(i){
    console.log(i);
    console.warn("change made");
  }
  //

  //
  createItem(str): void {
    this.itemsRef.push({str:str});
  }
  getItemList(){
    return this.itemsRef.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(
        snap.payload.val(), { $key: snap.key }) 
      )
    })
  } 
  getItemList2(){
    return this.itemsRef.snapshotChanges().map(arr => {
      console.log(arr)
      return arr.map(snap => {
        Object.assign(
        snap.payload.val(), { $key: snap.key }) ;
        console.log(snap)
      }
      )
    })
  }
  getItem(key: string): Observable<any> {
    const itemPath = `${this.basePath}/${key}`;
    this.item = this.af.object(itemPath).valueChanges();
    return this.item
  }
  //

  // ngOnInit() {
  //   //console.log(this.af);
    
  //   //this.items.push({ message: "desc"});
  //   //    console.log(this.items);
  //   let a = firebase.database().ref('/idproofs/').once('value').then((snapshot)=> {
  //     //var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  //     // ...
  //     console.log(snapshot.val());
  //     this.msgVal = snapshot.val();

  //     this.asyncpipe1 = new  Observable<any>(
  //       (observer: Subscriber<any>)=>{
  //         setInterval(()=>{
  //           this.msgVal = snapshot.val();
  //           observer.next(this.msgVal[1].filesize)
  //         },1000);
  //       }
  //     ) 
  //     // this.resolvepipe(snapshot)
  //     // .then(
  //     //   (res)=>{
  //     //     let r = JSON.parse(JSON.stringify(res));
  //     //     console.log(r[1].filesize)
  //     //     this.asyncpipe = r[1].filesize; 
  //     //   }
  //     // );
  //     // console.log(this.asyncpipe)
  //     this.asyncpipe = new Observable<string>((observer: Subscriber<string>) => {
  //       setInterval(() => observer.next(new Date().toString()), 1000);
  //     });
      
  //   });

  //   //
  //   //console.log(this.get());
  //   //this.msgVal = this.get();
  // }
  // resolvepipe(snapshot){
  //   return new Promise<string>((resolve, reject) => resolve(snapshot.val()));
  // }

  get (): AngularFireList<any[]>{
      return this.af.list('/idproofs');
  }
}
