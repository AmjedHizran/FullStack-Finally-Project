import {Injectable, Output, EventEmitter} from '@angular/core';
import {Branch} from './../models/branch.model';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class BranchService {
constructor(private myHttpClient: HttpClient) {}

getAllBranches (callBack: (b: Array<Branch>) => void): void {
    this.myHttpClient.get<Array<Branch>>('http://localhost:50320/api/Branch/all/')
    .subscribe(callBack);
}

getBranch(BranchID: number, callBack: (b: Branch) => void): void {
    this.myHttpClient.get<Branch>('http://localhost:50320/api/Branch/' + BranchID)
    .subscribe(
        callBack
    );
}



deleteBranch(BranchID: number, callBack: (b: boolean) => void): void {
this.myHttpClient.delete<boolean>('http://localhost:50320/api/Branch/delete/' + BranchID)
.subscribe(
    callBack
);
}


addBranch(branch: Branch, callBack: (b: boolean) => void): void {
    this.myHttpClient.post<boolean>('http://localhost:50320/api/Branch/add/', branch)
    .subscribe(
        callBack
    );

}

editCarPreview(BranchName: string , branch: Branch, callBack: (b: boolean) => void): void {
    this.myHttpClient.put<boolean>('http://localhost:50320/api/Branch/edit/' + BranchName, branch)
    .subscribe(
        callBack
    );
}
}
