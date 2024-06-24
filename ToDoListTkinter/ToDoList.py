import tkinter as tk
from tkinter import messagebox

todo_list = []

def add_string(string):
    todo_list.append(string)
    update_display()

def delete_string(index):
    if 0 <= index < len(todo_list):
        del todo_list[index]
        update_display()

def modify_string(index, new_string):
    if 0 <= index < len(todo_list):
        todo_list[index] = new_string
        update_display()

def update_display():
    task_listbox.delete(0, tk.END)
    for task in todo_list:
        task_listbox.insert(tk.END, task)

def add_task():
    new_task = task_entry.get()
    if new_task:
        add_string(new_task)
        task_entry.delete(0, tk.END)

def delete_task():
    selected_task_index = task_listbox.curselection()
    if selected_task_index:
        index = selected_task_index[0]
        delete_string(index)
    else:
        messagebox.showwarning('Warning', 'Please select a task to delete.')

def modify_task():
    selected_task_index = task_listbox.curselection()
    if selected_task_index:
        index = selected_task_index[0]
        new_task = task_entry.get()
        if new_task:
            modify_string(index, new_task)
            task_entry.delete(0, tk.END)
        else:
            messagebox.showwarning('Warning', 'Please enter a new task.')
    else:
        messagebox.showwarning('Warning', 'Please select a task to modify.')

root = tk.Tk()
root.title('Todo List GUI')

task_entry = tk.Entry(root, width=40)
task_entry.pack(pady=10)

add_button = tk.Button(root, text='Add Task', command=add_task)
add_button.pack()

task_listbox = tk.Listbox(root, width=50)
task_listbox.pack(pady=10)

delete_button = tk.Button(root, text='Delete Task', command=delete_task)
delete_button.pack()

modify_button = tk.Button(root, text='Modify Task', command=modify_task)
modify_button.pack()

update_display()

root.mainloop()
