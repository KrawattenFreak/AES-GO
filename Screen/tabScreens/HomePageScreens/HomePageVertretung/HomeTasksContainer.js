import { TouchableOpacity, Pressable, RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TasksContainer({ tasksData }) {


    const aktuelleTasks = tasksData


    return (
        <View style={style.contentView_content}>
            <View style={style.tasksHeaderView}>

                <Ionicons name={'clipboard'} size={20} color={'grey'} />
                <Text style={style.tasksHeaderText}>
                    OFFENE AUFGABEN
                </Text>

            </View>

            {

                aktuelleTasks.length != 0 ?

                    <View style={style.myTasksView}>

                        {

                            aktuelleTasks.map(data => {

                                return (

                                    <View style={style.oneTaskView} key={generateUUID()}>


                                        <Text style={style.oneTaskFachText}>
                                            {String(data.fach).toUpperCase()}
                                        </Text>
                                        <Text style={style.oneTaskHeaderText}>
                                            {data.header}
                                        </Text>
                                        <Text style={style.oneTaskHomeworkText} numberOfLines={3}>
                                            {data.homework}
                                        </Text>



                                    </View>

                                )


                            })

                        }





                    </View> :


                    <View style={style.myTasksNoEntriesView}>
                        <Ionicons name={'checkmark-circle'} size={20} color={'white'} />
                        <Text style={style.myTasksNoEntriesText}>ALLE AUFGABEN ERLEDIGT</Text>
                    </View>

            }


            <View style={style.tasksTapView}>
                <Text style={style.tasksTapText}>Tippe für alle aktuellen Aufgaben</Text>
                <Ionicons name={'caret-down-outline'} size={15} color={'grey'} />
            </View>

        </View>
    )

}


const style = StyleSheet.create({
    contentView_content: {
        alignItems: 'center',
        //justifyContent: 'center',
        //CODE:001
        marginHorizontal: 20,
        backgroundColor: 'rgb(250, 250, 250)',
        borderRadius: 10,
        borderColor: '#dadae8',
        borderWidth: 0.5,

        //SHADOW
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.05,
        shadowRadius: 5,

        elevation: 4,

        marginBottom: 20,
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    contentView_contentText: {
        fontSize: 15,
        color: 'grey',

    },



    tasksHeaderView: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    tasksHeaderText: {
        fontSize: 15,
        fontWeight: '800',
        color: 'grey',
        marginLeft: 10,

    },

    tasksTapView: {
        alignItems: 'center',
        marginTop: 15
    },
    tasksTapText: {
        color: 'grey',
        fontSize: 10
    },





    //TASKS

    myTasksView: {

    },


    oneTaskView: {

        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#dadae8',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',

    },

    oneTaskFachText: {
        textAlign: 'center',
        fontWeight: '700',
        color: 'grey',
        marginBottom: 10

    },
    oneTaskHeaderText: {

        fontWeight: '600',
        marginBottom: 7,
        fontSize: 14

    },
    oneTaskHomeworkText: {
        fontSize: 12
    },

    //------------------

    myTasksNoEntriesView: {
        marginVertical: 5,
        alignItems: 'center',
        backgroundColor: '#00db3b',
        borderColor: '#00b02f',

        borderRadius: 10,
        padding: 20
    },
    myTasksNoEntriesText: {
        color: 'black',
        marginTop: 5,
        fontWeight: '700',
        fontSize: 10,
        color: 'white'
    }

})


function generateUUID() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx-xxxxxx3xx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}