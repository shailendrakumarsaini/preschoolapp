import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BranchService } from 'src/app/organizationadmin/branch/branch.service';

@Injectable({
    providedIn : "root"
})

export class UpdatebranchResolveService implements Resolve<any> {
    constructor(private branchService: BranchService,) {
    }

    resolve(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
         let branchId = activatedRouteSnapshot.paramMap.get('branchId');
        return this.branchService.getBranchDetails(branchId); 
    }
}