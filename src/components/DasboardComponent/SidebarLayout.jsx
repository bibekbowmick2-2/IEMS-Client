import React from "react";
import { Sidebar } from "flowbite-react";
// import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";
import { HiChartPie, HiInbox,HiTable} from "react-icons/hi";
import { Link } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";

const SidebarLayout = ({ children }) => {
   const [isAdmin] = useAdmin();
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-800 text-white">
        <Sidebar aria-label="Sidebar with multi-level dropdown example">
        {
          isAdmin && <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Link to="/dasboard">
                <Sidebar.Item icon={HiChartPie}>Dashboard</Sidebar.Item>
              </Link>
              {/* <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
                <Link to="/products">
                  <Sidebar.Item>Products</Sidebar.Item>
                </Link>
                <Link to="/sales">
                  <Sidebar.Item>Sales</Sidebar.Item>
                </Link>
                <Link to="/refunds">
                  <Sidebar.Item>Refunds</Sidebar.Item>
                </Link>
                <Link to="/shipping">
                  <Sidebar.Item>Shipping</Sidebar.Item>
                </Link>
              </Sidebar.Collapse> */}
              <Link to="/allusers">
                <Sidebar.Item icon={HiInbox}>All Users</Sidebar.Item>
              </Link>
              <Link to="/allstudysession">
                <Sidebar.Item icon={HiTable}> All Study Session</Sidebar.Item>
              </Link>
              <Link to="/allmaterials">
                <Sidebar.Item icon={HiTable}> All Materials</Sidebar.Item>
              </Link>
        
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        }
          
        </Sidebar>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default SidebarLayout;
