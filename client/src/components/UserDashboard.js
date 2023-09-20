import React, { Fragment, useEffect } from 'react'
import UserDashLIst from './UserDashLIst'
import DashBoardNav from './DashBoardNav'
import FolderList from './FolderList'
import { useState, useRef, useContext } from 'react'
import Loader from './Loader'
import HackContext from '../Context/HackContext'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMyCertificate } from '../actions/certificateAction'
import TableRowSections from './TableRowSections'


const UserDashboard = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userResult = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getMyCertificate(props.user.id));
    }, [dispatch, getMyCertificate, props.user.id])
    const certificatesResult = useSelector((state) => state.certificates);
    let loading = userResult.loading || certificatesResult.loading
    let isAuthenticated = userResult.isAuthenticated || certificatesResult.isAuthenticated
    if (!loading && !isAuthenticated) {
        navigate("/login");
    }
    const certificates = certificatesResult.certificates;
    // const context = useContext(HackContext)
    // const { certificateListState ,setCertificateListState} = context;
    // setCertificateListState(certificates)

    const folderAddBG = useRef()
    const folderAdd = useRef()

    const handleOnCertificatePopupOut = () => {
        folderAdd.current.style.display = "none"
        folderAddBG.current.style.display = "none"
    }
    const heightDefine = () => {
        console.log("Inside the hight define")
        if (certificates && certificates.length > 0) {
            if (certificates.length > 3) {
                const str = 100 + (certificates.length - 3) * 10
                return str

            }
            else {
                return 100
            }

        }
        else {
            return 100
        }
    }
    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <div className='certiDiv' style={{ height: heightDefine() + "vh" }}>

                    <DashBoardNav user={userResult.user} />

                    {/* <div ref={folderAddBG} onClick={handleOnCertificatePopupOut} className="certificateOrgToUserShowUp"></div> */}

                    {/* <div className="certiList" >
                        <h1 style={{ textAlign: "center", marginTop: "2%" }}>Certificates</h1>
                        {certificates ? (certificates.length != 0) ? certificates.map((i, index) => {
                            return <UserDashLIst i={i} givenBy={i.organisation.name} date={i.date} key={index} sno={index} certName={i.name} />
                        }) : <h3 style={{ textAlign: "center", marginTop: "2%" }}>No Certificates Issued</h3> : <h3 style={{ textAlign: "center" }}>No Certificates Issued</h3>}
                    </div> */}

                    <div className="certiList">
                        <h1 style={{ textAlign: "center", marginTop: "2%" }}>Certificates</h1>
                        <table className='userDashTable'>
                            {/* <Fragment> */}
                                {certificates ?

                                    (certificates.length != 0) ? certificates.map((i, index) => {
                                        return <TableRowSections i={i} givenBy={i.organisation.name} date={i.date} sno={index} certName={i.name} />
                                    })

                                        : <h3 style={{ textAlign: "center", marginTop: "2%" }}>No Certificates Issued</h3> : <h3 style={{ textAlign: "center" }}>No Certificates Issued</h3>}
                            {/* </Fragment> */}
                        </table>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default UserDashboard