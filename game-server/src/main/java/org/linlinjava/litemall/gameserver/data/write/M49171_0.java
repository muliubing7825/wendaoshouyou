package org.linlinjava.litemall.gameserver.data.write;

import org.linlinjava.litemall.gameserver.data.GameWriteTool;
import org.linlinjava.litemall.gameserver.data.vo.Vo_49171_0;
import org.linlinjava.litemall.gameserver.netty.BaseWrite;
import org.springframework.stereotype.Service;
import io.netty.buffer.ByteBuf;

import java.util.List;

@Service

public class M49171_0 extends BaseWrite{
    @Override
    protected void writeO(ByteBuf writeBuf, Object object) {
        List<Vo_49171_0> object1 = (List<Vo_49171_0>) object;
        GameWriteTool.writeByte(writeBuf, object1.size());
        for (int i = 0; i < object1.size(); i++) {
            GameWriteTool.writeByte(writeBuf, object1.get(i).isGot);
            GameWriteTool.writeShort(writeBuf, object1.get(i).limitLevel);
            GameWriteTool.writeByte(writeBuf, object1.get(i).vo491710s.size());
            for (int j = 0; j < object1.get(i).vo491710s.size(); j++) {
                GameWriteTool.writeString(writeBuf, object1.get(i).vo491710s.get(j).name);
                GameWriteTool.writeInt(writeBuf, object1.get(i).vo491710s.get(j).number);
                GameWriteTool.writeInt(writeBuf, object1.get(i).vo491710s.get(j).level);
            }
        }
    }

    @Override
    public int cmd() {
        return 49171;
    }
}





















































































































































































































































































