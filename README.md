------------------------------------------------

-----Sign up----
POST: /api/auth/register (x-www-form-urlencoded)
	email
	username
	password

----Sign in-----
POST: /api/auth/login (x-www-form-urlencoded)
	email
	password

----Reset Password----
POST: /api/auth/recover (x-www-form-urlencoded)
	email

----Refresh Token----
POST: /api/auth/refreshtoken (x-www-form-urlencoded)
	email
	token(refresh token)

----Sign out----
DELETE: /api/auth/logout (x-www-form-urlencoded)
	token(refresh token)


----auth: bearer token------Gửi kèm token------------

-----Update Profile----
PUT: /api/user/update (x-www-form-urlencoded)----profile------
	nickname
	numphone
	sex
	datebirth
	address

----Update Profile Image------
PUT: /api/user/update (form-data)---profile image-----
	file

-----Show user info-----
GET: /api/user/show (x-www-form-urlencoded)

-----Display Image-------
GET: /api/user/image/:filename

-----Create Event--------
POST: /api/user/event

-----Update Event--------
PUT: /api/user/eventupdate
	id(id sự kiện)
	event(tên sự kiện)
	address(nơi tổ chức)
	bio(mô tả)
	catelogy(loại sự kiện)
	date(ngày diễn ra)
	time(giờ diễn ra)
	group(nhóm sự kiện. VD: Bên nội)
	eventImage(ảnh sự kiện)

-----GET All Events--------
GET: /api/user/eventshow (trả về toàn bộ sự kiện của user đó)

-----Get Event By Id---------
POST: /api/user/eventshowone (trả về sự kiện theo ID)
	id(id sự kiện)

-----DELETE Event------
DELETE: /api/user/destroyevent (xóa sự kiện theo ID)
	id(id sự kiện)

-----Create Family--------
POST: /api/user/family (khi tạo mới family thì trường firstname, lastname sẽ được gán 1 tên mặc định vì 2 trường đó yêu cầu required)

-----Update Family--------
PUT: /api/user/familyupdate
	id(id family)
	firstname
	middlename
	lastname
	email
	nickname
	numphone
	sex
	datebirth
	address
	job(nghề nghiệp)
	parentage(dòng họ. VD: Bên nội)
	yourself(danh xưng của bạn)
	relatives(danh xưng của người thân)
	nation(dân tộc)
	religion (tôn giáo)
	profileImage(ảnh của người thân)

-----GET All Familys--------
GET: /api/user/familyshow (trả về danh sách family của user đó)

-----Get Family By ID---------
POST: /api/user/familyshowone (trả về family theo ID)
	id(id family)

-----DELETE Family------
DELETE: /api/user/destroyfamily (xóa family theo ID)
	id(id family)

-----Search Family---------
POST: /api/user/familysearch 





------Tạo mới 1 Gia Phả (Tạo author và root)------


POST: api/user/newtree -----------> (New Update)

----> thông tin của author
	treename (tên gia phả - required)
	author (người tạo - required))
	address (địa chỉ người tạo)
	imgauth (ảnh)

----> thông tin của root
	firstname (required)
	middlename
	lastname (required)
	nickname
	sex
	dob (ngày sinh)
	domicile (nguyên quán)
	dod (ngày mất)
	burialplace (mộ táng)
	imgroot (ảnh)---> string
	rank (thứ bậc anh em)------> Number -----------> (New Update)

-----> dữ liệu trả về -----------> (New Update)
{
    "auth": {
        "isPublish": false,
        "_id": "5f29a5d0c643e83e38570b4a",
        "userId": "5f1afeafcfecab0004061b19",
        "treename": "Dòng họ Trần",
        "author": "Nguyễn Thanh Thái",
        "address": "Bến Lức, Long An",
        "numGen": 1,
        "numMem": 1,
        "countParents": 0,  			-----------> (New Update)
        "countChilds": 0,
        "createdAt": "2020-08-04T18:15:44.310Z",
        "updatedAt": "2020-08-04T18:15:44.310Z",
        "__v": 0
    },
    "root": {
        "isSpouse": false,
        "_id": "5f29a5d0c643e83e38570b4b",
        "userId": "5f1afeafcfecab0004061b19",
        "authId": "5f29a5d0c643e83e38570b4a",
        "parentId": "5f29a5d0c643e83e38570b4a",
        "firstname": "Trần",
        "middlename": "Văn",
        "lastname": "Hải",
        "nickname": "Ông Nội",
        "sex": "Nam",
        "numphone": "0987654365",
        "dob": "22/8/1968",
        "domicile": "tp.HCM",
        "rank": 1,  					-----------> (New Update)
        "sort": 0, 						 -----------> (New Update)
        "createdAt": "2020-08-04T18:15:44.745Z",
        "updatedAt": "2020-08-04T18:15:44.745Z",
        "fullname": "Trần Văn Hải",
        "__v": 0
    }
}



-------Tạo leaf của cây GP (không phải vợ/chồng - "isSpouse" = false)------

POST: api/user/newleaf -----------> (New Update)

	authId (id của author - required)
	parentId (_id của node cha )

	firstname (required)
	middlename
	lastname (required)
	nickname
	sex
	dob (ngày sinh)
	domicile (nguyên quán)
	dod (ngày mất)
	burialplace (mộ táng)
	profileImage (ảnh) ---> string
	rank (thứ bậc anh em)------> Number -----------> (New Update)


-----> dữ liệu trả về -----------> (New Update)
{
    "leaf": {
        "isSpouse": false,
        "_id": "5f29ad727861724a1c80b166",
        "userId": "5f1afeafcfecab0004061b19",
        "authId": "5f29a5d0c643e83e38570b4a",
        "parentId": "5f29a5d0c643e83e38570b4b",
        "firstname": "Trần",
        "middlename": "Văn",
        "lastname": "An",
        "nickname": "Chú",
        "sex": "Nam",
        "numphone": "09876543457",
        "dob": "22/8/1968",
        "domicile": "Bến Lức, Long An",
        "profileImage": "genealogy-1594727254071-genealogy-logo.png",
        "rank": 3,  									-----------> (New Update)
        "sort": 0,										 -----------> (New Update)
        "createdAt": "2020-08-04T18:48:18.626Z",
        "updatedAt": "2020-08-04T18:48:18.626Z",
        "fullname": "Trần Văn An",
        "__v": 0
    },
    "message": "Genealogy has been updated"
}




-------Lấy về tất cả Node của 1 Author(Gia Phả)------

POST: api/user/leafshowall
	authId (_id của author)

-----> dữ liệu trả về -----------> (New Update)
{
    "leaf": [
        {
            "isSpouse": false,
            "_id": "5f29a854c643e83e38570b50",
            "userId": "5f1afeafcfecab0004061b19",
            "parentId": "5f29a5d0c643e83e38570b4a",
            "authId": "5f29a5d0c643e83e38570b4a",
            "firstname": "Trần",
            "middlename": "Văn",
            "lastname": "Hà",
            "nickname": "Ông Sơ",
            "numphone": "09876543457",
            "sex": "Nam",
            "dob": "22/8/1968",
            "domicile": "Bến Lức, Long An",
            "profileImage": "genealogy-1594727254071-genealogy-logo.png",
            "createdAt": "2020-08-04T18:26:28.236Z",
            "sort": -2,
            "updatedAt": "2020-08-04T18:26:28.236Z",
            "fullname": "Trần Văn Hà",
            "__v": 0
        },
        {
            "isSpouse": false,
            "_id": "5f29a7e2c643e83e38570b4f",
            "userId": "5f1afeafcfecab0004061b19",
            "parentId": "5f29a854c643e83e38570b50",
            "authId": "5f29a5d0c643e83e38570b4a",
            "firstname": "Trần",
            "middlename": "Văn",
            "lastname": "Nam",
            "nickname": "Ông cố",
            "numphone": "09876543457",
            "sex": "Nam",
            "dob": "22/8/1968",
            "domicile": "Bến Lức, Long An",
            "profileImage": "genealogy-1594727254071-genealogy-logo.png",
            "createdAt": "2020-08-04T18:24:34.582Z",
            "sort": -1,
            "updatedAt": "2020-08-04T18:26:28.240Z",
            "fullname": "Trần Văn Nam",
            "__v": 0
        },
        {
            "isSpouse": false,
            "_id": "5f29a5d0c643e83e38570b4b",
            "userId": "5f1afeafcfecab0004061b19",
            "authId": "5f29a5d0c643e83e38570b4a",
            "parentId": "5f29a7e2c643e83e38570b4f",
            "firstname": "Trần",
            "middlename": "Văn",
            "lastname": "Hải",
            "nickname": "Ông Nội",
            "sex": "Nam",
            "numphone": "0987654365",
            "dob": "22/8/1968",
            "domicile": "tp.HCM",
            "rank": 1,
            "sort": 0,
            "createdAt": "2020-08-04T18:15:44.745Z",
            "updatedAt": "2020-08-04T18:24:34.585Z",
            "fullname": "Trần Văn Hải",
            "__v": 0
        },
        {
            "isSpouse": false,
            "_id": "5f29a6f2c643e83e38570b4c",
            "userId": "5f1afeafcfecab0004061b19",
            "authId": "5f29a5d0c643e83e38570b4a",
            "parentId": "5f29a5d0c643e83e38570b4b",
            "firstname": "Trần",
            "middlename": "Văn",
            "lastname": "Cẩn",
            "nickname": "Chú",
            "sex": "Nam",
            "numphone": "09876543457",
            "dob": "22/8/1968",
            "domicile": "Bến Lức, Long An",
            "profileImage": "genealogy-1594727254071-genealogy-logo.png",
            "sort": 0,
            "createdAt": "2020-08-04T18:20:34.151Z",
            "updatedAt": "2020-08-04T18:20:34.151Z",
            "fullname": "Trần Văn Cẩn",
            "__v": 0
        },
        {
            "isSpouse": false,
            "_id": "5f29a75bc643e83e38570b4d",
            "userId": "5f1afeafcfecab0004061b19",
            "authId": "5f29a5d0c643e83e38570b4a",
            "parentId": "5f29a5d0c643e83e38570b4b",
            "firstname": "Trần",
            "middlename": "Văn",
            "lastname": "Hậu",
            "nickname": "Chú",
            "sex": "Nam",
            "numphone": "09876543457",
            "dob": "22/8/1968",
            "domicile": "Bến Lức, Long An",
            "profileImage": "genealogy-1594727254071-genealogy-logo.png",
            "sort": 0,
            "createdAt": "2020-08-04T18:22:19.328Z",
            "updatedAt": "2020-08-04T18:22:19.328Z",
            "fullname": "Trần Văn Hậu",
            "__v": 0
        },
        {
            "isSpouse": true,
            "_id": "5f29a77dc643e83e38570b4e",
            "userId": "5f1afeafcfecab0004061b19",
            "spouseId": "5f29a5d0c643e83e38570b4b",
            "authId": "5f29a5d0c643e83e38570b4a",
            "firstname": "Triệu",
            "middlename": "Thị Thu",
            "lastname": "Hoa",
            "nickname": "Bà Nội",
            "numphone": "0987654326",
            "sex": "Nữ",
            "dob": "22/8/1968",
            "domicile": "Bến Lức, Long An",
            "profileImage": "genealogy-1594727254071-genealogy-logo.png",
            "sort": 0,
            "createdAt": "2020-08-04T18:22:53.512Z",
            "updatedAt": "2020-08-04T18:22:53.512Z",
            "fullname": "Triệu Thị Thu Hoa",
            "__v": 0
        }
    ]
}




-------Tạo Node cha-----

POST: api/user/parentleaf -----------> (New Update)

	authId (id của author - required)
	childId (_id của node con ) 		-----------> (Note)

	firstname (required)
	middlename
	lastname (required)
	nickname
	sex
	dob (ngày sinh)
	domicile (nguyên quán)
	dod (ngày mất)
	burialplace (mộ táng)
	profileImage (ảnh) ---> string
	rank (thứ bậc anh em)------> Number 


-----> dữ liệu trả về -----------> (New Update)
{
    "leaf": {
        "isSpouse": false,
        "_id": "5f29a854c643e83e38570b50",
        "userId": "5f1afeafcfecab0004061b19",
        "parentId": "5f29a5d0c643e83e38570b4a",				-----------> (Note)
        "authId": "5f29a5d0c643e83e38570b4a",				-----------> (Note)
        "firstname": "Trần",
        "middlename": "Văn",
        "lastname": "Hà",
        "nickname": "Ông Sơ",
        "numphone": "09876543457",
        "sex": "Nam",
        "dob": "22/8/1968",
        "domicile": "Bến Lức, Long An",
        "profileImage": "genealogy-1594727254071-genealogy-logo.png",
        "createdAt": "2020-08-04T18:26:28.236Z",
        "sort": -2,											-----------> (New Update)
        "updatedAt": "2020-08-04T18:26:28.236Z",
        "fullname": "Trần Văn Hà",
        "__v": 0
    },
    "message": "Genealogy has been updated"
}
