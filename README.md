# Schule

A small school planner app I built for myself. You put in your timetable,
and homework gets added to your calendar automatically.

# What it does

## Timetable
You set up your school timetable once (subjects per lesson and day).
If your school has alternating weeks, you can set up a Week A and a Week B timetable.

## Homework
When you enter a homework, the app looks at the current time and your timetable
to find the current (or last) lesson. Then it looks up the next lesson of that
subject and adds the homework as an event to your Apple Calendar at that time.
So the homework shows up exactly when you need it.

## Screenshots

<img width="1125" height="2436" alt="IMG_1768" src="https://github.com/user-attachments/assets/63042e84-fb2a-4868-9161-f26a144e1a8d" />


# Built with

- React Native + Expo (JavaScript)
- expo-calendar (access to the native calendar)
- AsyncStorage (to save the timetable on the device)
- GitHub Actions + EAS Update (automatic updates)


# Why I built it

I wanted a simple way to keep track of my homework with the native apple Calender app without having to look at a timetable everytime. Now it goes straight into my calendar.
