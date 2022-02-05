import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NetworkResponse } from 'src/app/model/networkresponse.model';
import { AlertService } from 'src/app/services/alert.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';
import { GlobalVariable } from 'src/globalVariable';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private categoryService: CategoryService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (response: NetworkResponse) => {
        if (response.status === 'OK') {
          this.allCategories = response.payload;
        } else {
          this.alertService.failureMessage(
            'Something went wrong',
            'Unexpected error'
          );
        }
      },
      (err) => {
        this.alertService.failureMessage(
          'Something went wrong',
          'Unexpected error'
        );
      }
    );

    this.getDataForQuery();
  }

  allCategories: any[] = [];

  subCategories: any[] = [];

  query: {
    category: string[];
    subCategory: string[];
    price: {
      lte: number | null;
      gte: number | null;
    };

    name: string;
  } = {
    category: [],
    subCategory: [],
    price: {
      gte: null,
      lte: null,
    },
    name: '',
  };

  // items
  productList: any[] = [];
  pageOfItems: any[] = [];

  onChangeCategory(categoryName: any, eventTarget: any) {
    let foundCategoryIndexInQuery = this.query.category.findIndex(
      (item) => item === categoryName
    );

    let selectedCategoryIndex = this.allCategories.findIndex(
      (item) => item.name === categoryName
    );

    if (eventTarget.checked && foundCategoryIndexInQuery === -1) {
      // checked logic
      this.query.category.push(categoryName);
      this.subCategories.push(this.allCategories[selectedCategoryIndex]);
    } else if (!eventTarget.checked && foundCategoryIndexInQuery !== -1) {
      // unchecked logic
      this.query.category.splice(foundCategoryIndexInQuery, 1);
      this.allCategories[selectedCategoryIndex].subCategory.forEach(
        (item: any) => {
          this.query.subCategory = this.query.subCategory.filter(
            (queryItem) => {
              return queryItem !== item;
            }
          );
        }
      );
      this.subCategories = this.subCategories.filter(
        (item) => item.name !== categoryName
      );
    }
  }

  onChangeSubCategory(subCategoryName: string, eventTarget: any) {
    let foundSubCategoryIndexInQuery = this.query.subCategory.findIndex(
      (item) => item === subCategoryName
    );

    if (eventTarget.checked && foundSubCategoryIndexInQuery === -1) {
      this.query.subCategory.push(subCategoryName);
    } else if (!eventTarget.checked && foundSubCategoryIndexInQuery !== -1) {
      this.query.subCategory.splice(foundSubCategoryIndexInQuery, 1);
    }
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  getAllSubCategoriesFromSelectedCategories() {
    return this.subCategories.reduce((acc: any[], val) => {
      if (!val)
        val = {
          subCategory: [],
        };
      return acc.concat(val.subCategory);
    }, []);
  }

  shopQueryForm: FormGroup = this.fb.group({});

  // Networks
  getDataForQuery() {
    this.productService.getProductsByQuery({ query: this.query }).subscribe(
      (response: NetworkResponse) => {
        if (response.status === 'OK') this.productList = response.payload;
        else {
          this.alertService.failureMessage(
            'Something went wrong',
            'Unexpected error'
          );
        }
      },
      (err) => {
        this.alertService.failureMessage(
          'Something went wrong',
          'Unexpected error'
        );
      }
    );
  }
}
