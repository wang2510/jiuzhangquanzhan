import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseDto } from 'app/shared/model/course-dto.model';
import { SERVER_API_URL } from 'app/app.constants';
import { CourseWithTNDto } from 'app/shared/model/courseWithTN-dto.model';

@Injectable()
export class CourseService {
    private courseAddressUrl = SERVER_API_URL + '/api/course/findAllCoursesDto';
    private courseAddressWithTNUrl = SERVER_API_URL + '/api/course/findAllCoursesWithTNDto';
    private courseDeleteUrl = SERVER_API_URL + '/api/course/deleteCourse';
    private courseUpdateUrl = SERVER_API_URL + '/api/course/updateCourse';
    private courseAddUrl = SERVER_API_URL + '/api/course/addCourse';
    private courseRegisterUrl = SERVER_API_URL + '/api/course/registerCourse';
    private courseUnregisterUrl = SERVER_API_URL + '/api/course/unregisterCourse';
    private courseAddressRegisteredUrl = SERVER_API_URL + '/api/course/findRegisteredCourses';
    private addCourseToStudentUrl = SERVER_API_URL + '/api/course/addCourseToStudent';

    constructor(private http: HttpClient) {}

    getCourseInfo(): Observable<CourseDto[]> {
        debugger;
        return this.http.get<CourseDto[]>(`${this.courseAddressUrl}`);
    }

    getCourseInfoWithTN(): Observable<CourseWithTNDto[]> {
        return this.http.get<CourseWithTNDto[]>(`${this.courseAddressWithTNUrl}`);
    }

    getRegisteredCourseInfo(): Observable<CourseDto[]> {
        return this.http.get<CourseDto[]>(`${this.courseAddressRegisteredUrl}`);
    }

    add(course: CourseDto): Observable<Response> {
        debugger;
        return this.http.post<Response>(this.courseAddUrl, course);
    }

    delete(courseName: String): Observable<Response> {
        debugger;
        return this.http.delete<Response>(`${this.courseDeleteUrl}/${courseName}`);
    }

    update(course: CourseDto): Observable<Response> {
        return this.http.put<Response>(this.courseUpdateUrl, course);
    }

    register(courseName: string): Observable<Response> {
        debugger;
        return this.http.post<Response>(`${this.courseRegisterUrl}/${courseName}`, {});
    }

    unregister(courseName: string): Observable<Response> {
        return this.http.delete<Response>(`${this.courseUnregisterUrl}/${courseName}`);
    }

    addCourseToStudent(courseName: String, currentUserCredential: String) {
        return this.http.post(SERVER_API_URL + '/api/course/addCourseToStudent', { courseName, currentUserCredential });
    }
}
