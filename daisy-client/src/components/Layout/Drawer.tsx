interface DrawerProps {
  children: JSX.Element | JSX.Element[];
}

const Drawer = ({ children }: DrawerProps) => {
  return (
    <div className="bg-slate-100 drawer lg:drawer-open">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {children}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div
        className="drawer-side z-40"
        style={{ scrollBehavior: "smooth", scrollPaddingTop: "5rem" }}
      >
        <label
          htmlFor="drawer"
          aria-label="Close menu"
          className="drawer-overlay"
        ></label>
        <aside className="bg-neutral min-h-screen w-80">
          <div className="bg-neutral sticky top-0 z-20 hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex">
            <a
              href="/"
              aria-current="page"
              aria-label="Homepage"
              className="flex-0 btn btn-ghost px-2"
            >
              <div className="font-title inline-flex text-base-100 text-lg md:text-2xl">
                Budget
              </div>
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Drawer;
