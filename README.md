# Description

## Pagination

For displaying of courses pagination is used. Pagination is done on server side (only 12 courses are returned in each request).

## Filtering

Users are to be filtered by exact match quesry for lastName or exact match query for firstname.

Titles are to be filtered by partial match – all results that include filter term will be displayed

## Sorting on admin side can be done by title and mentor name.

Filtering can be done by title (entering filter term in search field), by level and duration (select option from dropdown menu)

Filters can be removed by clicking remove filters button.


## Admin CRUD

Admin has all CRUD available (deleting, editing, and adding courses, and deleting and editing users)

Admin also must approve the user before the user is able to log in. Admin can also deactivate the user account. In case if an account is deactivated that information will be displayed to the admin. If the user decides to delete his account admin will have that info on the table (message will be displayed account closed).

For all deleting soft delete is enabled.
## Mentor CRUD 

Mentor can delete and edit their courses and add new ones.

A mentor can also filter his courses by query term entered in the search field.

## Student CRUD

Students can filter courses by mentor name, level, and duration. Users can also disable filters by by unchecking select filter checkbox

When the user hovers over the course title modal window is displayed with the button that enables the student to enroll in the course.

Students can also Enroll in courses. All courses in which the student is enrolled have a checkbox completed. In case if student marks the course as the finished course will be removed from the student dashboard.


