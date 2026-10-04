// Teaching shown on the Moodle look-alike (/teaching). Moodle links need a Bath login.
// Levels follow Bath unit codes: MA2xxxx = Year 2 undergraduate, MA5xxxx = MSc.

export const teachingTerms = [
    {
        id: 'now',
        title: 'This semester',
        subtitle: 'Semester 1, 2026/27',
        courses: [
            {
                code: 'MA22014',
                title: 'Statistics 2A',
                level: 'Year 2 undergraduate',
                role: 'Tutor',
                when: 'Semester 1, 2026/27',
                summary: 'I run two of the small-group tutorials (about 30 students each); the lectures are given by a colleague.',
                hue: 152,
            },
        ],
    },
    {
        id: 'next',
        title: 'Next semester',
        subtitle: 'Semester 2, 2026/27 · from February 2027',
        courses: [
            {
                code: 'MA22019',
                title: 'Introduction to Data Science',
                level: 'Year 2 undergraduate',
                role: 'Lecturer',
                when: 'Semester 2, 2026/27 · starts February 2027',
                moodle: 'https://moodle.bath.ac.uk/course/view.php?id=61794',
                hue: 211,
            },
            {
                code: 'MA50259',
                title: 'Statistical Design of Investigations',
                level: 'MSc',
                role: 'Lecturer',
                when: 'Semester 2, 2026/27 · starts February 2027',
                moodle: 'https://moodle.bath.ac.uk/course/view.php?id=62909',
                hue: 28,
            },
        ],
    },
];
