//All the topics and tasks which are taught in the month of October
db.Topics.aggregate([
    {
        $lookup: {
               from: "Tasks",
               localField: "Topic_Id",
               foreignField: "Topic_Id",
               as: "Task_in_October"
             }},
             {$match: {"Month":"October"}},
             {$project: {"Topic_Id":1,"Topic":1,"Month":1,"Task_in_October.Task_Detail":1,"Task_in_October.Month":1}}
    
    ])
    //All the company drives which appeared between 15 oct-2020 and 31-oct-2020
    db.Company_Drives.find({
  $and: [
    {
      Data: {
        $gte: "2022-10-10"
      }
    },
    {
      Data: {
        $lte: "2022-10-31"
      }
    }
  ]
})

//Find all the company drives and students who are appeared for the placement.
db.user.aggregate([
    {
        $lookup: {
               from: "Company_Drives",
               localField: "Id",
               foreignField: "User_Id",
               as: "Students_For_Placement"
             }},
              ])
//Find the number of problems solved by the user in codekata

db.Codekata.aggregate([{$group:{
    _id:'$User_Id',
    NoOfProblemsCompleted:{$sum:"$Completed"}}},
    ])
    
//all the mentors with who has the mentee's count more than 15
db.Mentors.find({
  "Mentee_Count": {
    "$gte": 15
  }
})

//number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020

db.Attendence.find({
  "$and": [
    {
      $and: [
        {
          ClassDate: {
            $gte: "2022-10-15"
          }
        },
        {
          ClassDate: {
            $lte: "2022-10-31"
          }
        }
      ]
    },
    {
      "Task_Completed": "No",
      "Status": "No"
    }
  ]
})
