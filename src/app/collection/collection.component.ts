import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../shared/collection.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  collections: string[] = [];
  data = [];
  constructor(private collectionService:CollectionService) { }

  ngOnInit() {
    this.collectionService.getCollections('2018-01-01', '2018-06-01')
    .subscribe(
      (data) => {
        this.collections = data['result'];
      },
      (error) => console.log(error)
    );
  }

}
