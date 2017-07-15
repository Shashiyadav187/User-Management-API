CREATE TABLE profile(
    Meetings int default 0,
    Name varchar(25),
    School varchar(25),
    admin boolean,
    pw varchar(25)
);

INSERT INTO profile (name, school, admin, pw)
VALUES
    ("pratham", "Woss", true, "password123"),
    ("jimmy", "IR", false, "password456"),
    ("mark", "Woss", false, "password789"),
    ("john", "School", true, "password0");

-- attended:
CREATE TABLE attended(
    name varchar(25),
    constant int default 1
);

insert into attended(name)
    values
        ("jimmy"),
        ("pratham");
        

update profile
    set profile.meetings = profile.meetings + (
        select constant from attended
            where attended.name = profile.name
);

update profile
  set profile.meetings = 0 where profile.meetings is null;