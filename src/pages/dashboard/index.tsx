import { Sidebar } from "@/components/Sidebar"
import { Navbar } from "@/components/Navbar";
import { useSession, signIn, signOut } from "next-auth/react"
import appendScript from '../../services/appendExternalJsFile';

export default function Dashboard() {
  const { data: session } = useSession()
  // if(session) {
  //   console.log('session', session)
  //   return <>
  //     Signed in as {session.user.email} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }
  // return <>
  //   Not signed in <br/>
  //   <button onClick={() => signIn()}>Sign in</button>
  // </>
  return (
    <>
      { appendScript('https://buttons.github.io/buttons.js') }
      { appendScript('https://kit.fontawesome.com/42d5adcbca.js') }
      <div className="g-sidenav-show bg-gray-100">
        <Sidebar />
        <main className="main-content position-relative border-radius-lg ">
          <Navbar />
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-uppercase font-weight-bold">Today's Money</p>
                          <h5 className="font-weight-bolder">
                            $53,000
                          </h5>
                          <p className="mb-0">
                            <span className="text-success text-sm font-weight-bolder">+55%</span>
                            since yesterday
                          </p>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                          <i className="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-uppercase font-weight-bold">Today's Users</p>
                          <h5 className="font-weight-bolder">
                            2,300
                          </h5>
                          <p className="mb-0">
                            <span className="text-success text-sm font-weight-bolder">+3%</span>
                            since last week
                          </p>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                          <i className="ni ni-world text-lg opacity-10" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-uppercase font-weight-bold">New Clients</p>
                          <h5 className="font-weight-bolder">
                            +3,462
                          </h5>
                          <p className="mb-0">
                            <span className="text-danger text-sm font-weight-bolder">-2%</span>
                            since last quarter
                          </p>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                          <i className="ni ni-paper-diploma text-lg opacity-10" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-uppercase font-weight-bold">Sales</p>
                          <h5 className="font-weight-bolder">
                            $103,430
                          </h5>
                          <p className="mb-0">
                            <span className="text-success text-sm font-weight-bolder">+5%</span> than last month
                          </p>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                          <i className="ni ni-cart text-lg opacity-10" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}