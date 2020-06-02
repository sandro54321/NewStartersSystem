import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service'
import { FormBuilder, Validators } from '@angular/forms';
import { Starter } from '../../models/Starter'; 
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  id: string;
  comment = {sentBy: null, comment: null, time: null};
  comments: Array<{sentBy:String,comment:String, time:Date}> = [];
  starter:Starter;

  constructor(public commonService:CommonService, private fb: FormBuilder, public route:ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CommentsComponent>) { }

  commentForm = this.fb.group({
    comment: [null, Validators.required]
  });

  ngOnInit(): void {
    this.getComments();
  }

  getComments(){
    this.commonService.getComments(this.data.id).subscribe(comments=> {this.comments = comments, console.log(this.comments)})
  }

  addComment(){
    let user =  JSON.parse(localStorage.getItem('user'))
    this.comment.comment = this.commentForm.get('comment').value
    this.comment.sentBy = user.name
    this.comment.time = new Date()
    
    this.commonService.addComment(this.data.id, this.comment).subscribe(()=> this.getComments())

  }
}
