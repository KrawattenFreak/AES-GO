import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TasksLoad(callback) {

    AsyncStorage.getItem('unterricht').then(value => {

        let tasksDATA = []

        const dataUnterricht = JSON.parse(value)

        for (const oneTask of dataUnterricht) {

            if (oneTask.done == false)
                tasksDATA.push(oneTask)
        }

        callback.call(this, tasksDATA)

    })

}