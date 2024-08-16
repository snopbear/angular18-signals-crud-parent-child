/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductInlineComponent } from './product-inline.component';

describe('CrudInlineComponent', () => {
  let component: ProductInlineComponent;
  let fixture: ComponentFixture<ProductInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductInlineComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
