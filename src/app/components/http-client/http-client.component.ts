import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ResourceService } from "../../services/resource.service";
import { Profile } from "../../models/user";

@Component({
  selector: "app-http-client",
  templateUrl: "./http-client.component.html",
  styleUrls: ["./http-client.component.scss"]
})
export class HttpClientComponent implements OnInit {
  translate: TranslateService;
  profile: Profile[];
  url: string = "https://jsonplaceholder.typicode.com/users";

  constructor(
    private resourceService: ResourceService,
    private el: ElementRef
  ) {}

  getUsers() {
    this.resourceService.getUsers(this.url).subscribe(resp => {
      this.profile = resp;
      if (this.profile.length % this.itemsPerPage === 0) {
        this.numberOfPaginators = Math.floor(
          this.profile.length / this.itemsPerPage
        );
      } else {
        this.numberOfPaginators = Math.floor(
          this.profile.length / this.itemsPerPage + 1
        );
      }

      for (let i = 1; i <= this.numberOfPaginators; i++) {
        this.paginators.push(i);
      }
    });
  }

  @ViewChildren("pages")
  pages: QueryList<any>;
  itemsPerPage = 2;
  numberOfVisiblePaginators = 10;
  numberOfPaginators: number;
  paginators: Array<any> = [];
  activePage = 1;
  firstVisibleIndex = 1;
  lastVisibleIndex: number = this.itemsPerPage;
  firstVisiblePaginator = 0;
  lastVisiblePaginator = this.numberOfVisiblePaginators;

  tableData = [
    { id: 1, firstName: "Mark", lastName: "Otto", username: "@mdo" },
    { id: 2, firstName: "John", lastName: "Doe", username: "@john" },
    { id: 3, firstName: "Lessie", lastName: "Moe", username: "@lessie" },
    { id: 4, firstName: "Otton", lastName: "Otto", username: "@otton" },
    { id: 5, firstName: "Krauze", lastName: "John", username: "@krauze" },
    { id: 6, firstName: "Lex", lastName: "Lucky", username: "@lex" },
    { id: 7, firstName: "Allie", lastName: "Bill", username: "@allie" },
    { id: 8, firstName: "Anna", lastName: "Frost", username: "@anna" },
    { id: 9, firstName: "Bob", lastName: "One", username: "@bob" },
    { id: 10, firstName: "Carl", lastName: "Johnson", username: "@cj" },
    { id: 11, firstName: "Mia", lastName: "Marx", username: "@mia" },
    { id: 12, firstName: "Cia", lastName: "Fbi", username: "@cia" },
    { id: 13, firstName: "John", lastName: "Doe", username: "@johny" },
    { id: 14, firstName: "Mark", lastName: "Otto", username: "@mdo" },
    { id: 15, firstName: "Lessie", lastName: "Moe", username: "@lessie" }
  ];

  changePage(event: any) {
    if (
      event.target.text >= 1 &&
      event.target.text <= this.numberOfPaginators
    ) {
      this.activePage = +event.target.text;
      this.firstVisibleIndex =
        this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
      this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    }
  }

  nextPage(event: any) {
    if (this.pages.last.nativeElement.classList.contains("active")) {
      if (
        this.numberOfPaginators - this.numberOfVisiblePaginators >=
        this.lastVisiblePaginator
      ) {
        this.firstVisiblePaginator += this.numberOfVisiblePaginators;
        this.lastVisiblePaginator += this.numberOfVisiblePaginators;
      } else {
        this.firstVisiblePaginator += this.numberOfVisiblePaginators;
        this.lastVisiblePaginator = this.numberOfPaginators;
      }
    }

    this.activePage += 1;
    this.firstVisibleIndex =
      this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage;
  }

  previousPage(event: any) {
    if (this.pages.first.nativeElement.classList.contains("active")) {
      if (
        this.lastVisiblePaginator - this.firstVisiblePaginator ===
        this.numberOfVisiblePaginators
      ) {
        this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
        this.lastVisiblePaginator -= this.numberOfVisiblePaginators;
      } else {
        this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
        this.lastVisiblePaginator -=
          this.numberOfPaginators % this.numberOfVisiblePaginators;
      }
    }

    this.activePage -= 1;
    this.firstVisibleIndex =
      this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage;
  }

  firstPage() {
    this.activePage = 1;
    this.firstVisibleIndex =
      this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    this.firstVisiblePaginator = 0;
    this.lastVisiblePaginator = this.numberOfVisiblePaginators;
  }

  lastPage() {
    this.activePage = this.numberOfPaginators;
    this.firstVisibleIndex =
      this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage;

    if (this.numberOfPaginators % this.numberOfVisiblePaginators === 0) {
      this.firstVisiblePaginator =
        this.numberOfPaginators - this.numberOfVisiblePaginators;
      this.lastVisiblePaginator = this.numberOfPaginators;
    } else {
      this.lastVisiblePaginator = this.numberOfPaginators;
      this.firstVisiblePaginator =
        this.lastVisiblePaginator -
        (this.numberOfPaginators % this.numberOfVisiblePaginators);
    }
  }

  ngOnInit() {
    this.getUsers();
  }
}
