// const firebaseConfig = {
//     apiKey: "AIzaSyBuoID-FVQH3stFpUJhQuKFFjRMQuPKnE0",
//     authDomain: "beauty-pageant-judging-system.firebaseapp.com",
//     projectId: "beauty-pageant-judging-system",
//     storageBucket: "beauty-pageant-judging-system.appspot.com",
//     messagingSenderId: "327388870081",
//     appId: "1:327388870081:web:7cc2a2ee298114ec4a6b40",
//     measurementId: "G-RB3GBY1QL6",
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const femaleButton=document.querySelector(".femaleMiss");
// const maleButton=document.querySelector(".maleMr");
// const contestantTable=document.querySelector(".table-judge-contestants");
// const submitMarks=document.querySelector(".submit-marks");
// const tableJudgePoints = document.querySelector(".table-judge-criteria-marks");
// let maleData=[];
// let femaleData=[];
//
// let maleRenderingFunction,femaleRenderingFunction;
// let id=0;
// // let currentRound="four";
// let currentMaleRound,currentFemaleRound;
//   let criteria1,criteria2,criteria3;
//   let currentJudgeId;
//   let maleMode=true,femaleMode;
//   // getting current contestant ids
//
//   const getCurrentContestantMaleId=async()=>{
//     let id;
//     const data=await db.collection("maleCurrentContestant").get();
//     data.forEach(each=>{
//       id=each.data().id;
//     })
//     return id;
//   }
//   const getCurrentContestantFemaleId=async()=>{
//     let id;
//     const data=await db.collection("femaleCurrentContestant").get();
//     data.forEach(each=>{
//       id=each.data().id;
//     })
//     return id;
//   }
//   const hightlightCurrentMale=async()=>{
//     const id=await getCurrentContestantMaleId();
//     document.getElementById(`${id}`).classList.add("highlight");
//
//   }
//   const hightlightCurrentFemale=async()=>{
//     const id=await getCurrentContestantFemaleId();
//     document.getElementById(`${id}`).classList.add("highlight");
//
//   }
//
//
//   db.collection("AcceptedApplications").orderBy("ContestantNo","asc").get().then(snapshot=>{
//     snapshot.forEach((each)=>{
//         if(each.data().Gender === "male"){
//             maleData.push({...each.data(),id : each.id});
//
//         }else{
//             femaleData.push({...each.data(),id : each.id});
//
//         }
//       });
//       // setting male current contestant
//         db.collection("maleCurrentContestant").doc("currentCont").get().then(data=>{
//           if(data.exists){
//             // pass
//           }else{
//             db.collection("maleCurrentContestant").doc("currentCont").set(maleData[0]).then(()=>{
//               console.log("successfully added current cont.");
//             }).catch(err=>{
//               console.log(err);
//             })
//           }
//         }).catch(err=>{
//           console.log(err);
//         })
//         // setting female current contestant
//         db.collection("femaleCurrentContestant").doc("currentCont").get().then(data=>{
//           if(data.exists){
//             // pass
//           }else{
//             db.collection("femaleCurrentContestant").doc("currentCont").set(femaleData[0]).then(()=>{
//               console.log("successfully added current cont.");
//             }).catch(err=>{
//               console.log(err);
//             })
//           }
//         }).catch(err=>{
//           console.log(err);
//         })
//
//
//         const maleRendering=()=>{
//             contestantTable.innerHTML="";
//             maleData.forEach(data=>{
//                 renderContestants(data);
//             })
//           }
//           const femaleRendering=()=>{
//             contestantTable.innerHTML="";
//             femaleData.forEach(data=>{
//                 renderContestants(data);
//             })
//           }
//           maleRenderingFunction=maleRendering;
//           femaleRenderingFunction=femaleRendering;
//           maleRenderingFunction();
//           hightlightCurrentMale();
//
//
//
//
//   }).catch(err=>{
//       console.log(err);
//   })
//   let criterias=[];
//   db.collection("Criteria").get().then(snapshot=>{
//
//     snapshot.forEach(each=>{
//
//             criterias.push(each.data());
//
//     });
//     db.collection("currentMaleRound").doc("currentRound").get().then(doc=>{
//       if(doc.exists){
//
//         currentMaleRound=doc.data().round;
//       }else{
//
//         db.collection("currentMaleRound").doc("currentRound").set({round : 1}).then(()=>{
//           console.log("succes adding round")
//         }).catch(err=>{
//           console.log(err);
//         });
//         currentMaleRound=1;
//       }
//
//       highlightCurrentRound();
//       renderCurrentCriterias();
//
//     }).catch(err=>{console.log(err);})
//
//
//
//   }).catch(err=>{
//       console.log(err);
//   })
//
//
//
//
//
//   db.collection("currentFemaleRound").doc("currentRound").get().then(doc=>{
//     if(doc.exists){
//       currentFemaleRound=doc.data().round;
//     }else{
//       db.collection("currentFemaleRound").doc("currentRound").set({round : 1}).then(()=>{
//         console.log("succes adding round")
//       }).catch(err=>{
//         console.log(err);
//       });
//       currentFemaleRound=1;
//     }
//   }).catch(err=>{console.log(err);})
//
//
//   // contestants rendering function
//   const renderContestants=(doc)=>{
//     const tr = `
//              <tr class="judge-contestant-row" id="${doc.id}">
//                 <td class="judge-contestant-num">${doc.ContestantNo}</td>
//                 <td class="judge-contestant-name">${doc.firstName} ${doc.lastName}</td>
//               </tr>
//   `;
//   contestantTable.insertAdjacentHTML("beforeend", tr);
//   }
//
//
//   maleButton.addEventListener("click",()=>{
//     maleMode=true;
//     femaleMode=false;
//     maleRenderingFunction();
//     hightlightCurrentMale();
//     renderCurrentCriterias();
//     highlightCurrentRound();
//   })
//   femaleButton.addEventListener("click",()=>{
//     maleMode=false;
//     femaleMode=true;
//     femaleRenderingFunction();
//     hightlightCurrentFemale();
//     renderCurrentCriterias();
//     highlightCurrentRound();
//
//   })
//   // criteria rendering function
//
//
//   const renderJudgePoints = (doc) => {
//     const tr = `
//                 <tr class="judge-criteria-row">
//                     <td class="judge-criteria">${doc.Description}</td>
//                     <td class="judge-criteria-marks-input">
//                       <input type="number" max="10" name="" class="round-${maleMode ? currentMaleRound : currentFemaleRound}" />
//                     </td>
//                   </tr>
//     `;
//     tableJudgePoints.insertAdjacentHTML("beforeend", tr);
//   };
//   // submitting marks
//   submitMarks.addEventListener("click",()=>{
//     let err=false;
//     let totalMarks=0;
//     const elements=document.querySelectorAll(`.round-${maleMode ? currentMaleRound : currentFemaleRound}`);
//     elements.forEach(each=>{
//       if(+each.value <=0 || +each.value>10){
//         err=true;
//       }else{
//         totalMarks+= +each.value;
//       }
//     })
//       if(err){
//           alert("invalid range for rating");
//           return;
//       }
//
//       if(maleMode){
//         // male mode
//         let prevMarks,judgeCounter,idsOfJudge=[];
//         getCurrentContestantMaleId().then(contId=>{
//           db.collection("AcceptedApplications").doc(`${contId}`).get().then(each=>{
//             let value=null;
//
//             if(!each.data()?.judgeIds){
//               idsOfJudge=[];
//             }else{
//               idsOfJudge=[...each.data().judgeIds];
//               value=each.data()?.judgeIds.find(eachId=> eachId == currentJudgeId);
//               }
//               if(!each.data()?.tMarks){
//                 prevMarks=0;
//               }else{
//                 prevMarks=each.data().tMarks;
//               }
//               if(!each.data()?.judgeCounter){
//                   judgeCounter=0;
//               }else{
//                 judgeCounter=each.data()?.judgeCounter;
//               }
//
//
//             if(value){
//               alert("You can't mark again");
//               return;
//             }
//             db.collection("AcceptedApplications").doc(`${contId}`).update({tMarks : prevMarks + totalMarks,
//             judgeCounter: judgeCounter + 1,
//              judgeIds :[...idsOfJudge,currentJudgeId] }).then(()=>{
//                console.log("Successfully added marks");
//              }).catch(()=>{console.log(err);})
//
//
//           }).catch(err=>{
//             console.log(err);
//           })
//         }).catch(err=>{
//           console.log(err);
//         })
//
//
//       }else{
//         // female mode
//         let prevMarks,judgeCounter,idsOfJudge=[];
//         getCurrentContestantFemaleId().then(contId=>{
//           db.collection("AcceptedApplications").doc(`${contId}`).get().then(each=>{
//             let value=null;
//
//             if(!each.data()?.judgeIds){
//               idsOfJudge=[];
//             }else{
//               idsOfJudge=[...each.data().judgeIds];
//               value=each.data()?.judgeIds.find(eachId=> eachId == currentJudgeId);
//               }
//               if(!each.data()?.tMarks){
//                 prevMarks=0;
//               }else{
//                 prevMarks=each.data().tMarks;
//               }
//               if(!each.data()?.judgeCounter){
//                   judgeCounter=0;
//               }else{
//                 judgeCounter=each.data()?.judgeCounter;
//               }
//
//
//             if(value){
//               alert("You can't mark again");
//               return;
//             }
//             db.collection("AcceptedApplications").doc(`${contId}`).update({tMarks : prevMarks + totalMarks,
//             judgeCounter: judgeCounter + 1,
//              judgeIds :[...idsOfJudge,currentJudgeId] }).then(()=>{
//                console.log("Successfully added marks");
//              }).catch(()=>{console.log(err);})
//
//
//           }).catch(err=>{
//             console.log(err);
//           })
//         }).catch(err=>{
//           console.log(err);
//         })
//       }
//
//
//
//
//   })
//   // getting number of judges
//   const getNumberOfJudges=async ()=>{
//     return new Promise((res,rej)=>{
//       let judgeCount=0;
//     db.collection("Judges").get().then(data=>{
//       data.forEach(each=>{
//         judgeCount++;
//
//       })
//       res(judgeCount);
//     }).catch(err=>{
//       rej(err);
//     })
//     })
//
//   }
//   // getting current judge and storing in global variable
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//
//       var uid = user.uid;
//
//       db.collection("Judges")
//         .where("email", "==", `${user.email}`)
//         .get()
//         .then((querySnapshot) => {
//           querySnapshot.forEach((doc) => {
//
//             currentJudgeId=doc.id;
//           });
//         });
//
//     }
//   });
//   // function for adding real time listener
//
//
// const maleListener=async ()=>{
//   let unSubscribe1,unSubscribe2,unSubscribe3;
//
//
//    unSubscribe1=db.collection("currentMaleRound").doc("currentRound").onSnapshot(snapshot=>{
//       if(snapshot.data().round == 4){
//         alert("its over");
//         unSubscribe1();
//         unSubscribe2();
//         unSubscribe3();
//
//
//       }
//   })
//    unSubscribe2= db.collection("AcceptedApplications").onSnapshot(snapshot=>{
//       getNumberOfJudges().then(count=>{
//           let changeRound=true;
//           snapshot.forEach(each=>{
//                 if(each.data().judgeCounter != count && each.data().Gender == "male"){
//                   changeRound=false;
//                 }
//           })
//           if(changeRound){
//             // changing round
//             let aRound;
//             db.collection("currentMaleRound").doc("currentRound").get().then(each=>{
//               aRound=each.data().round +1;
//               db.collection("currentMaleRound").doc("currentRound").update({round : aRound})
//
//               if(aRound ==2){
//                 let passed=[]
//                 db.collection("AcceptedApplications").where("Gender", "==","male").get().then(result=>{
//                   result.forEach(eachResult=>{
//                     passed.push(eachResult.data());
//
//                   })
//
//                   passed.sort((first,second)=> second.tMarks - first.tMarks);
//                   let newPassed=passed.slice(0,5);
//                   db.collection("AcceptedApplications")
//                   .where("Gender", "==", "male")
//                   .get()
//                   .then((snapshot) => {
//                     snapshot.forEach((each) => {
//                       db.collection("AcceptedApplications").doc(each.id).delete();
//                     });
//                   });
//                   newPassed.forEach(eachCont=>{
//                     await db.collection("AcceptedApplications").set(eachCont);
//                   })
//
//
//                 })
//               }
//
//               db.collection("AcceptedApplications").where("Gender", "==","male").get().then(querySnapshot=>{
//                 querySnapshot.forEach(eachQuery=>{
//                   await db.collection("AcceptedApplications").doc(`${eachQuery.id}`).update({
//                     judgeCounter : 0,
//                     judgeIds : [],
//
//                   })
//
//
//                 })
//
//                 await db.collection("maleCurrentContestant").doc("currentCont").delete();
//                   location.reload();
//
//               }).catch(err=>{console.log(err);})
//
//             }).catch(err=>{
//               console.log(err);
//             })
//
//
//
//
//           }
//             // continuing
//
//
//
//
//       }).catch(err=>{console.log(err);})
//     })
//
//
//     getCurrentContestantMaleId().then(contId=>{
//       unSubscribe3=db.collection("AcceptedApplications").doc(`${contId}`).onSnapshot(snapshot=>{
//        console.log("changing2");
//        console.log(snapshot.data());
//        getNumberOfJudges().then(count=>{
//          console.log(count);
//          if(snapshot.data().judgeCounter == count){
//            console.log("changing");
//            // change contestant
//            const nextMaleContestant=maleData.find(each=> +each.ContestantNo > +snapshot.data().ContestantNo);
//            db.collection("maleCurrentContestant").doc("currentCont").set(nextMaleContestant).then(()=>{
//              console.log("successfully added current cont.");
//              location.reload();
//            }).catch(err=>{
//              console.log(err);
//            })
//
//
//          }
//        }).catch(err=> console.log(err))
//      })
//    }).catch(err=>{
//      console.log(err);
//    })
//   }
//   maleListener();
//
//
//
//
//
// // rendering current criterias
// function renderCurrentCriterias(){
//   tableJudgePoints.innerHTML="";
//   if(maleMode){
//
//     criterias.forEach(each=>{
//         if(each.round == currentMaleRound){
//
//           renderJudgePoints(each);
//         }
//     })
//
//   }else{
//     criterias.forEach(each=>{
//       if(each.round == currentFemaleRound){
//
//         renderJudgePoints(each);
//       }
//   })
//   }
//
//
//
//
// }
// function highlightCurrentRound(){
//   document.getElementById(`${maleMode ? currentMaleRound : currentFemaleRound}`).classList.add("highlight");
// }
//
//
//
const firebaseConfig = {
  apiKey: "AIzaSyBuoID-FVQH3stFpUJhQuKFFjRMQuPKnE0",
  authDomain: "beauty-pageant-judging-system.firebaseapp.com",
  projectId: "beauty-pageant-judging-system",
  storageBucket: "beauty-pageant-judging-system.appspot.com",
  messagingSenderId: "327388870081",
  appId: "1:327388870081:web:7cc2a2ee298114ec4a6b40",
  measurementId: "G-RB3GBY1QL6",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const femaleButton = document.querySelector(".femaleMiss");
const maleButton = document.querySelector(".maleMr");
const contestantTable = document.querySelector(".table-judge-contestants");
const submitMarks = document.querySelector(".submit-marks");
let maleData = [];
let femaleData = [];
let maleRenderingFunction, femaleRenderingFunction;
let id = 0;
let currentRound = "four";
let criteria1, criteria2, criteria3;

//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       var uid = user.uid;
//       db.collection("Judges").where("email", "==", `${user.email}`).get().then(judge=>{
//           judge.forEach()
//       }).catch(err=>{
//           console.log(err);
//       });
//       // ...
//     } else {
//       // User is signed out
//       // ...
//     }
//   });
db.collection("AcceptedApplications")
  .orderBy("ContestantNo", "asc")
  .get()
  .then((snapshot) => {
    snapshot.forEach((each) => {
      if (each.data().Gender === "male") {
        maleData.push(each.data());
      } else {
        femaleData.push(each.data());
      }
      const maleRendering = () => {
        contestantTable.innerHTML = "";
        maleData.forEach((data) => {
          renderContestants(data);
        });
      };
      const femaleRendering = () => {
        contestantTable.innerHTML = "";
        femaleData.forEach((data) => {
          renderContestants(data);
        });
      };
      maleRenderingFunction = maleRendering;
      femaleRenderingFunction = femaleRendering;
      maleRenderingFunction();
    });
  })
  .catch((err) => {
    console.log(err);
  });
let currentCriterias = [];
db.collection("Criteria")
  .get()
  .then((snapshot) => {
    snapshot.forEach((each) => {
      if (each.data().Name.includes(currentRound)) {
        currentCriterias.push(each.data());
      }
    });
    const renderingCriterias = () => {
      currentCriterias.forEach((each) => {
        renderJudgePoints(each);
      });
    };

    renderingCriterias();
    criteria1 = document.getElementById("1");
    criteria2 = document.getElementById("2");
    criteria3 = document.getElementById("3");
  })
  .catch((err) => {
    console.log(err);
  });

const renderContestants = (doc) => {
  const tr = `
             <tr class="judge-contestant-row">
                <td class="judge-contestant-num">${doc.ContestantNo}</td>
                <td class="judge-contestant-name">${doc.firstName} ${doc.lastName}</td>
              </tr>
  `;
  contestantTable.insertAdjacentHTML("beforeend", tr);
};

maleButton.addEventListener("click", () => {
  maleRenderingFunction();
});
femaleButton.addEventListener("click", () => {
  femaleRenderingFunction();
});
const tableJudgePoints = document.querySelector(".table-judge-criteria-marks");
const renderJudgePoints = (doc) => {
  const tr = `
                <tr class="judge-criteria-row">
                    <td class="judge-criteria">${doc.Description}</td>
                    <td class="judge-criteria-marks-input">
                      <input type="number" max="10" name="" id="${++id}" />
                    </td>
                  </tr>
    `;
  tableJudgePoints.insertAdjacentHTML("beforeend", tr);
};
submitMarks.addEventListener("click", () => {
  if (
    +criteria1.value <= 0 ||
    +criteria2.value <= 0 ||
    +criteria3.value <= 0 ||
    +criteria1.value > 10 ||
    +criteria2.value > 10 ||
    +criteria3.value > 10
  ) {
    alert("invalid range for rating");
  }
  let totalMarks;
  totalMarks =
    Number(criteria1.value) + Number(criteria2.value) + Number(criteria3.value);

  criteria1.value = "";
  criteria2.value = "";
  criteria3.value = "";
});

//bakar
//put current contestant id here in doc.id
document
  .querySelector(".admin-disqualify-button")
  .addEventListener("click", () => {
    console.log(JudgeLoggedIn);
    // db.collection("AcceptedApplications")
    //   .doc(`${doc.id}`)
    //   .delete()
    //   .then(() => {
    //     alert("Contestant disqualified successfully");
    //   })
    //   .catch((err) => {
    //     console.log("Error removing document", err);
    //   });
  });
var round1 = [3];
var round2 = [3];
var round3 = [3];
var round4 = [3];
var roundName = [4];
var countForRound1 = 0;
var countForRound2 = 0;
var countForRound3 = 0;
var countForRound4 = 0;
db.collection("Criteria")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.data().Name.includes("one")) {
        round1[countForRound1++] = doc.data().Description;
        roundName[0] = doc.data().Name;
      }
      if (doc.data().Name.includes("two")) {
        round2[countForRound2++] = doc.data().Description;
        roundName[1] = doc.data().Name;
      }
      if (doc.data().Name.includes("three")) {
        round3[countForRound3++] = doc.data().Description;
        roundName[2] = doc.data().Name;
      }
      if (doc.data().Name.includes("four")) {
        round4[countForRound4++] = doc.data().Description;
        roundName[3] = doc.data().Name;
      }
    });
  });
document
  .querySelector(".criteria-rendering-button")
  .addEventListener("click", () => {
    document.querySelector(".judge-rounds-criteria").innerHTML = "";
    var tr = `
  	<tr>
			<td>${roundName[0]}</td>
			<td>${round1[0]}, ${round1[1]}, ${round1[2]}</td>
			<td>30</td>
		</tr>
  `;
    document
      .querySelector(".judge-rounds-criteria")
      .insertAdjacentHTML("beforeend", tr);
    tr = `
  	<tr>
			<td>${roundName[1]}</td>
			<td>${round2[0]}, ${round2[1]}, ${round2[2]}</td>
			<td>30</td>
		</tr>
  `;
    document
      .querySelector(".judge-rounds-criteria")
      .insertAdjacentHTML("beforeend", tr);

    tr = `
  	<tr>
			<td>${roundName[2]}</td>
			<td>${round3[0]}, ${round3[1]}, ${round3[2]}</td>
			<td>30</td>
		</tr>
  `;
    document
      .querySelector(".judge-rounds-criteria")
      .insertAdjacentHTML("beforeend", tr);
    tr = `
  	<tr>
			<td>${roundName[3]}</td>
			<td>${round4[0]}, ${round4[1]}, ${round4[2]}</td>
			<td>30</td>
		</tr>
  `;
    document
      .querySelector(".judge-rounds-criteria")
      .insertAdjacentHTML("beforeend", tr);
  });
// document.getElementById("logout-judge").addEventListener("click", () => {
//   window.location.assign("../public/Judgelogin.html");
//   firebase.auth.signout();
//
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       var email = user.email;
//       alert("Active user " + email);
//     } else {
//       alert("No Active user Found");
//     }
//   });
// });
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     var email = user.email;
//     alert("Active user " + email);
//   } else {
//     alert("No Active user Found");
//     window.location.assign("../public/index.html");
//   }
// });
