import React from "react";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {};

const InputBoxForm = (props: Props) => {
  return (
    <div className="pr-14">
      <label className="flex-row mt-5 pb-4 w-[120-px]">
        {props.title && <div className="text-[15px] w-full mb-3">{props.title}</div>}
      </label>
        <input
          {...props}
          className=" bg-white w-full text-[15px] py-[1px] rounded-[7px] border-2 border-gold pl-2 text-black focus:border-gold  focus:outline-gold"
        />
    </div>
  );
};

export default InputBoxForm;