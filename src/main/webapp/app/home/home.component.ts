import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';
import { CourseService } from 'app/shared/service/CourseService';
import { CourseDto } from 'app/shared/model/course-dto.model';
import { CourseWithTNDto } from 'app/shared/model/courseWithTN-dto.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    classeNameNeedToReg: string;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private courseService: CourseService
    ) {}

    courses: CourseDto[] = [];

    registeredCourses: CourseDto[] = [];

    courseName: string;
    courseLocation: string;
    courseContent: string;
    teacherId: string;
    course: CourseDto;

    coursesWithTN: CourseWithTNDto[] = [];

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    getAllCourses() {
        debugger;
        this.courseService.getCourseInfo().subscribe(curDto => {
            if (!curDto) {
                this.courses = [];
            } else {
                this.courses = curDto;
            }
        });
    }

    getAllCoursesWithTN() {
        this.courseService.getCourseInfoWithTN().subscribe(curDto => {
            if (!curDto) {
                this.coursesWithTN = [];
            } else {
                this.coursesWithTN = curDto;
            }
        });
    }

    getRegisteredCourse() {
        debugger;
        this.courseService.getRegisteredCourseInfo().subscribe(curDto => {
            this.registeredCourses = curDto;
        });
    }

    addNewCourse() {
        debugger;
        this.course = new CourseDto(this.courseName, this.courseLocation, this.courseContent, this.teacherId);
        this.courseService.add(this.course).subscribe(
            data => {
                console.log('DELETE Request is successful ', data);
            },
            error => {
                console.log('Error', error);
            }
        );
        if (this.courses && this.courses.length != 0) {
            this.courses.push(this.course);
        }
        this.courseName = '';
        this.courseLocation = '';
        this.courseContent = '';
        this.teacherId = '';
    }

    deleteCourse(courseName, i) {
        this.courseService.delete(courseName).subscribe(
            data => {
                console.log('DELETE Request is successful ', data);
            },
            error => {
                console.log('Error', error);
            }
        );
        this.courses.splice(i, 1);
    }

    registerCourse(courseName) {
        debugger;
        this.courseService.register(courseName).subscribe(
            data => {
                console.log('DELETE Request is successful ', data);
            },
            error => {
                console.log('Error', error);
            }
        );
    }

    unregisterCourse(courseName, i) {
        this.courseService.unregister(courseName).subscribe(
            data => {
                console.log('DELETE Request is successful ', data);
            },
            error => {
                console.log('Error', error);
            }
        );
        this.registeredCourses.splice(i, 1);
    }

    clearAllCourses() {
        this.courses = [];
    }

    clearRegisteredCourses() {
        this.registeredCourses = [];
    }

    addCourseToStudent() {
        const courseName = 'temp';
        this.courseService.addCourseToStudent(courseName, currentUserCredential);
    }
}
