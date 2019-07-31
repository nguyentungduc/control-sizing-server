import React from 'react';
import ControlSize from '../ControlSize/ControlSize';
import '../../reducers/index.js';
import { connect } from 'react-redux';
import {
    addCounts,
    getCount,
    subCounts,
    updateCount,
    deleteCount,
    changeCount,
} from "../../actions/count";
import FormError from '../FormError/FormError';
import FadeLoader from 'react-spinners/FadeLoader';
import { notification } from 'antd';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: 0,
            checkInput: true,
            loading: true,
        }
    }

    componentDidMount() {
        this.getCount();
    }

    getCount = async () => {
        this.setState({
            loading: true,
        });
        try {
            const list = await this.props.getCount();
            this.setState({
                inputValue: list.length,
            });
        } catch (err) {
            notification.error({
                message: "Error !",
                description: "Get counts error!"
            })
        }
        this.setState({
            loading: false,
        });
    }


    handleUpParent = async() => {
        this.setState({
            loading: true,
        });
        await this.checkErrorAddCounts(1);
        this.setState({
            loading: false,
        });
    }

    checkErrorAddCounts = async (distance) => {
        const check =  await this.props.addCounts(distance);
        if(check){
            this.setState({
                inputValue: this.props.count.list.length,
            });
        } else {
            notification.error({
                message: "Error !",
                description: "Up parent count error!"
            })
        }
    }

    handleDownParent = async () => {
        this.setState({
            loading: true,
        });
        await this.checkErrorSubCounts(1);
        this.setState({
            loading: false,
        });
    }

    checkErrorSubCounts = async (distance) => {
        const check = await this.props.subCounts(distance);
        if(check){
            this.setState({
                inputValue: this.props.count.list.length,
            });
        }else{
            notification.error({
                message: "Error !",
                description: "Down parent count error !"
            })
        }
    }

    handleDeleteParent = async () => {
        this.setState({
            loading: true,
        });
        const check  = await this.props.subCounts(this.props.count.list.length);
        if(check){
            this.setState({
                inputValue: this.props.count.list.length,
            });
        }else{
            notification.error({
                message: "Error !",
                description: "Delete all error !",
            });
        }
        this.setState({
            loading: false,
        })
    }

    handleBlurParent = async (e) => {
        if ((e.target.value != this.props.count.list.length) && this.state.checkInput) {
            let distance = e.target.value - this.props.count.list.length
            if (distance > 0) {
                this.setState({
                    loading: true
                });
                await this.checkErrorAddCounts(distance);
                this.setState({
                    loading: false
                });
            } else {
                this.setState({
                    loading: true
                });
                await this.checkErrorSubCounts(distance * -1);
                this.setState({
                    loading: false
                })
            }
        }
    }

    handleChangeInputParent = (e) => {
        let value = isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value);
        this.setState({
            inputValue: value,
            checkInput: value > 100 ? false : true,
        });
    }

    handleDeleteChildren = (id, _index) => {
        return async () => {
            this.setState({
                loading: true,
            });
            const check = await this.props.deleteCount(id);
            if(check){
                this.setState({
                    inputValue: this.props.count.list.length,
                });
            }else{
                notification.error({
                    message: "Error !",
                    description: "Error delete children !",
                })
            }
            this.setState({
                loading: false,
            });
        }
    }

    handleChangeInputChild = (_id) => {
        return (e) => {
            let _value = e.target.value;
            console.log(e);
            _value = isNaN(parseInt(_value)) ? 0 : parseInt(_value);
            let data = {
                id: _id,
                value: _value,
            }
            console.log(_value);
            this.props.changeCount(data);
        }
    }

    handleBlurInputChild = (_id) => {
        return async (e) => {
            let _value = e.target.value;
            _value = isNaN(parseInt(_value)) ? 0 : parseInt(_value);
            this.setState({
                loading: true,
            });
            await this.checkChild(_id, _value);
            this.setState({
                loading: false,
            });
        }
    }

    handUpChild = (_id, _value) => {
        return () => {
            this.checkChild(_id,_value)
        }
    }

    handDownChild = (_id, _value) => {
        return () => {
            this.checkChild(_id, _value);
        }
    }

    checkChild = async(_id,_value) => {
        this.setState({
            loading: true,
        });
        const check = await this.props.updateCount(_id, _value);
        if(!check){
            notification.error({
                message: "Error !",
                description: "Have error when change value children !",
            })
        }
        this.setState({
            loading: false,
        });
    }

    render() {
        return (
            <div className="container">
                <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6">
                    <div className="form-group">
                        <label>Quantity</label>
                        <ControlSize
                            value={this.state.inputValue}
                            onTodoChange={this.handleChangeInputParent}
                            onTodoBlur={this.handleBlurParent}
                            up={this.handleUpParent}
                            down={this.handleDownParent}
                            delete={this.handleDeleteParent}
                            disabled={this.state.loading}
                        />
                        <FormError
                            isHidden={this.state.checkInput}
                        />

                    </div>
                </div>

                <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6">

                    {
                        this.props.count.list.map((item, index) => (
                            <div className="form-group" key={index}>
                                <label>index: {index}</label>
                                <ControlSize key={item.id}
                                    value={item.value}
                                    onTodoChange={this.handleChangeInputChild(item.id)}
                                    onTodoBlur={this.handleBlurInputChild(item.id)}
                                    up={this.handUpChild(item.id, item.value + index + 1)}
                                    down={this.handDownChild(item.id, item.value - index - 1)}
                                    delete={this.handleDeleteChildren(item.id, index)}
                                    disabled={this.state.loading}
                                />
                            </div>
                        ))
                    }
                    <div className={this.state.loading ? 'sweet-loading' : 'hidden'}>
                        <FadeLoader
                            sizeUnit={"px"}
                            size={100}
                            color={'red'}
                            loading={this.state.loading}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    addCounts,
    getCount,
    subCounts,
    updateCount,
    deleteCount,
    changeCount,
}

const mapStateToProps = (store) => {
    return {
        count: store.count,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
