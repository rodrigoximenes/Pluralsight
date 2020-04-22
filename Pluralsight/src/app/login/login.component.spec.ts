import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
        ]) 
      ],
    }).compileComponents();

    router = TestBed.get(Router); 
    router.initialNavigation(); 
  }));

  beforeEach(() => {
    let authService = new AuthService();
    let formBuilder = new FormBuilder();

    component = new LoginComponent(authService, formBuilder, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
