import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { selectColoumns, toggleSettings } from '../../store/actions';
import './setting.css';

const Settings = () => {
  const dispatch = useDispatch();
  const showSettings = useSelector((state) => state.toggleSettings.showSetting);

  const initialTableColumn = useSelector(
    (state) => state.tableReducer.initialTableData,
  );

  const handleCloseClick = () => {
    dispatch(toggleSettings(!showSettings));
  };

  const handleChangeClick = () => {
    dispatch(
      selectColoumns(
        dragDropList.filter((item) => selectedList.includes(item)),
      ),
    );
  };

  const [dragDropList, setDragDropList] = useState(initialTableColumn);
  const [selectedList, setSelectedList] = useState(initialTableColumn);

  const onDragComplete = (result) => {
    if (!result.destination) return;
    const arr = [...dragDropList];
    let removedItem = arr.splice(result.source.index, 1)[0];
    arr.splice(result.destination.index, 0, removedItem);
    setDragDropList(arr);
  };

  const handleClick = (e) => {
    if (e.target.innerText === 'Date' || e.target.innerText === 'App') {
      return;
    }
    let str = e?.target?.innerText;
    if (
      e.target.innerText === 'Ad Requests' ||
      e.target.innerText === 'Ad Responses'
    ) {
      str = e.target.innerText.split(' ')[1];
    }

    document.getElementById(str)?.classList.toggle('selected');

    if (selectedList.includes(str)) {
      setSelectedList((prev) => prev.filter((ps) => ps !== str));
    } else {
      setSelectedList([...selectedList, str]);
    }
  };

  return (
    <div className="settings_box">
      <h5 className="heading">Dimensions and Metrics</h5>
      <DragDropContext onDragEnd={onDragComplete}>
        <Droppable droppableId="settings_btns" direction="horizontal">
          {(provided) => (
            <div
              className="settings_btns"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {dragDropList.map((data, i) => (
                <Draggable key={data} draggableId={data} index={i}>
                  {(provided) => (
                    <div
                      id={data}
                      onClick={handleClick}
                      className={`btn_settings selected`}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      {data === 'app_id'
                        ? 'App'
                        : data === 'Requests' || data === 'Responses'
                        ? `Ad ${data}`
                        : data}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="cta_btn">
        <div className="close_btn btn" onClick={handleCloseClick}>
          Close
        </div>
        <div className="apply_btn btn" onClick={handleChangeClick}>
          Apply Change
        </div>
      </div>
    </div>
  );
};

export default Settings;
